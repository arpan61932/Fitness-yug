export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/10 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 mb-10">

        {/* Brand */}
        <div>
          <a href="#home" className="font-[Teko] text-3xl font-bold tracking-widest text-white">
            FITNESS<span className="text-neon">YUG</span>
          </a>
          <p className="text-gray-500 text-sm mt-4 leading-relaxed">
            The ultimate strength training aesthetic facility. Built for those who refuse to be average.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-[Teko] text-xl tracking-widest text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {["Home", "About", "Classes", "Memberships"].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-500 hover:text-neon text-sm transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/admin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-neon text-sm transition-colors flex items-center gap-1"
              >
                🔐 Admin Portal
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-[Teko] text-xl tracking-widest text-white mb-4">Contact Us</h4>
          <div className="space-y-2 text-gray-500 text-sm">
            <p>📍 123 Fitness Avenue, Muscle City</p>
            <p>📞 (555) 123-4567</p>
            <p>✉️ contact@fitnessyug.com</p>
          </div>
        </div>

      </div>

      <div className="border-t border-white/10 pt-6 text-center text-gray-600 text-xs flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto px-6">
        <span>© 2026 Fitness Yug. All Rights Reserved. Built for Performance.</span>
        <a href="/admin" target="_blank" rel="noopener noreferrer" className="hover:text-neon transition-colors mt-2 md:mt-0">
          Admin Portal Login →
        </a>
      </div>
    </footer>
  )
}
