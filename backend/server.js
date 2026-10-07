require("dotenv").config();
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Static file serving logic
const distPath = path.join(__dirname, "../dist");
if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
} else {
    app.use(express.static(path.join(__dirname, "../")));
}

// ── Database Setup ────────────────────────────────────
const isVercel = Boolean(process.env.VERCEL);
const dbDir = isVercel ? "/tmp" : __dirname;
const dbPath = path.join(dbDir, "database.sqlite");

if (isVercel) {
    const sourceDb = path.join(__dirname, "database.sqlite");
    if (fs.existsSync(sourceDb) && !fs.existsSync(dbPath)) {
        try {
            fs.copyFileSync(sourceDb, dbPath);
        } catch (e) {
            console.error("Failed to copy database to /tmp:", e);
        }
    }
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) return console.error("DB Error:", err);
    console.log("✅ Connected to SQLite Database at", dbPath);

    db.run(`CREATE TABLE IF NOT EXISTS members (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        email       TEXT NOT NULL,
        phone       TEXT,
        description TEXT,
        join_date   DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Add columns if missing (safe migrations)
    db.run(`ALTER TABLE members ADD COLUMN phone TEXT`, () => {});
    db.run(`ALTER TABLE members ADD COLUMN description TEXT`, () => {});
    
    // Performance index on join_date
    db.run(`CREATE INDEX IF NOT EXISTS idx_members_join_date ON members(join_date DESC)`, () => {});
});

// ── Email Transporter ─────────────────────────────────
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

function sendOwnerEmail({ email, phone, description }) {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        console.log("ℹ️ Email credentials not set in .env, skipping email notification.");
        return;
    }

    const mailOptions = {
        from: `"Fitness Yug Website" <${process.env.GMAIL_USER}>`,
        to: process.env.OWNER_EMAIL || process.env.GMAIL_USER,
        subject: "🏋️ New Member Sign-Up — Fitness Yug",
        html: `
        <div style="font-family: Arial, sans-serif; background:#0d0d0d; color:#e0e0e0; padding:32px; border-radius:8px;">
            <h2 style="color:#c8f743; font-size:24px; margin-bottom:8px;">New Member Joined!</h2>
            <p style="color:#aaa; margin-bottom:24px;">Someone just signed up via the Fitness Yug website.</p>
            <table style="width:100%; border-collapse:collapse;">
                <tr>
                    <td style="padding:10px 16px; background:#1a1a1a; border-radius:4px 4px 0 0; color:#aaa; width:140px;">📧 Email</td>
                    <td style="padding:10px 16px; background:#1a1a1a; border-radius:4px 4px 0 0; color:#fff;">${email}</td>
                </tr>
                <tr>
                    <td style="padding:10px 16px; background:#111; color:#aaa;">📞 Phone</td>
                    <td style="padding:10px 16px; background:#111; color:#fff;">${phone || "Not provided"}</td>
                </tr>
                <tr>
                    <td style="padding:10px 16px; background:#1a1a1a; border-radius:0 0 4px 4px; color:#aaa;">💬 Message</td>
                    <td style="padding:10px 16px; background:#1a1a1a; border-radius:0 0 4px 4px; color:#fff;">${description || "Not provided"}</td>
                </tr>
            </table>
            <p style="color:#555; font-size:12px; margin-top:24px;">Fitness Yug Website — Auto Notification</p>
        </div>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.error("❌ Email send failed:", err.message);
        else console.log("✅ Owner notified:", info.messageId);
    });
}

// ── API: Join Form ────────────────────────────────────
app.post("/api/join", (req, res) => {
    let { email, phone, description } = req.body;

    if (!email || typeof email !== "string") {
        return res.status(400).json({ error: "Valid email is required" });
    }

    email = email.trim().toLowerCase();
    phone = phone ? phone.trim() : null;
    description = description ? description.trim() : null;

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    db.run(
        `INSERT INTO members (email, phone, description) VALUES (?, ?, ?)`,
        [email, phone, description],
        function (err) {
            if (err) {
                console.error("Database Insert Error:", err);
                return res.status(500).json({ error: "Database error" });
            }

            // Async email notification to owner
            sendOwnerEmail({ email, phone, description });

            res.status(200).json({ message: "Successfully joined!", id: this.lastID });
        }
    );
});

// ── API: Admin Login ─────────────────────────────────
app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;
    const adminUser = process.env.ADMIN_USERNAME || "admin";
    const adminPass = process.env.ADMIN_PASSWORD || "admin123";

    if (username === adminUser && password === adminPass) {
        const token = Buffer.from(`${username}:${Date.now()}:fy_secret`).toString("base64");
        return res.json({ success: true, message: "Login successful", token, username });
    }

    return res.status(401).json({ success: false, error: "Invalid username or password" });
});

// ── API: Get All Members (Admin) ──────────────────────
app.get("/api/members", (req, res) => {
    db.all(`SELECT * FROM members ORDER BY join_date DESC`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(rows);
    });
});

// ── API: Delete Member (Admin) ───────────────────────
app.delete("/api/members/:id", (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM members WHERE id = ?`, [id], function (err) {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ success: true, message: `Member #${id} deleted successfully` });
    });
});

// ── Admin Dashboard ───────────────────────────────────
app.get("/admin", (req, res) => {
    const backendAdmin = path.join(__dirname, "public/admin.html");
    const rootAdmin = path.join(__dirname, "../public/admin.html");
    const distAdmin = path.join(__dirname, "../dist/admin.html");

    if (fs.existsSync(rootAdmin)) {
        return res.sendFile(rootAdmin);
    } else if (fs.existsSync(backendAdmin)) {
        return res.sendFile(backendAdmin);
    } else if (fs.existsSync(distAdmin)) {
        return res.sendFile(distAdmin);
    } else {
        return res.status(404).send("Admin panel HTML file not found.");
    }
});

// ── Start Server ──────────────────────────────────────
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
        console.log(`📊 Admin panel at  http://localhost:${PORT}/admin`);
    });
}

module.exports = app;
