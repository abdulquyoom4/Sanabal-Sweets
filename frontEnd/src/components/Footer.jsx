import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0b2b17] text-gray-200 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Company Info */}
        <div>
          <img
            src="src/assets/footerIcon.jpeg"
            alt="Snabel Sweets Logo"
            className="w-34 h-auto mb-2"
          />
          <h2 className="text-2xl font-bold mb-4 text-white">Snabel Sweets</h2>
          <p className="mt-2">© 2026 Snabel Sweets. All rights reserved.</p>
          <p className="mt-5"> Made with ❤️ by Abdul Quyoom</p>
        </div>

        {/* Contact Section with Clickable Map */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Contact Us</h3>
          <p className="my-2">📞 +92 310 8191215</p>
          <p>📍 Malakwal Bhera Road, Mid Mor</p>

          {/* Clickable wide map image */}
          <a
            href="https://maps.app.goo.gl/bkq6ZT7FVU5HVxvp9"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out max-w-90"
          >
            <img
              src="src/assets/map.png"
              alt="Shop Location on Map"
              className="w-full h-32 md:h-40 object-cover"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
