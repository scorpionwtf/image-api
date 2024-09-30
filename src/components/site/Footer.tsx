import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        {/* Footer Main Title */}
        <h2 className="text-lg font-semibold mb-4">upscale-ai.com</h2>
        <p className="mb-6 text-sm">AI powered free online tool for upscaling and enhancing images, photos, and pictures in batch</p>

        {/* Footer Links */}
        <ul className="flex justify-center space-x-8 text-sm mb-6">
          <li>
            <a href="/terms" className="hover:underline">
              Terms of Use
            </a>
          </li>
          <li>
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/blog" className="hover:underline">
              Blog
            </a>
          </li>
          <li>
            <a href="/affiliate" className="hover:underline">
              Affiliate Program
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:underline">
              Contact Us
            </a>
          </li>
          <li>
            <a href="https://twitter.com" target="_blank" className="hover:underline">
              Twitter
            </a>
          </li>
          <li>
            <a href="https://discord.com" target="_blank" className="hover:underline">
              Discord
            </a>
          </li>
        </ul>

        {/* Copyright Section */}
        <p className="text-xs text-gray-400 mb-4">© 2024 upscale-ai.com. All rights reserved.</p>

        {/* Language Selector */}
        <ul className="flex justify-center space-x-4 text-xs mb-6">
          <li>
            <a href="/" className="hover:underline">
              English
            </a>
          </li>
          <li>
            <a href="/zh" className="hover:underline">
              繁體中文
            </a>
          </li>
          <li>
            <a href="/fr" className="hover:underline">
              Français
            </a>
          </li>
          <li>
            <a href="/ja" className="hover:underline">
              日本語
            </a>
          </li>
          <li>
            <a href="/ko" className="hover:underline">
              한국어
            </a>
          </li>
          <li>
            <a href="/de" className="hover:underline">
              Deutsch
            </a>
          </li>
          <li>
            <a href="/es" className="hover:underline">
              Español
            </a>
          </li>
          <li>
            <a href="/vi" className="hover:underline">
              Tiếng Việt
            </a>
          </li>
        </ul>

        {/* Footer Logo */}
        <div className="flex justify-center items-center">
          <Image
            src="/images/upscaler-og.png"
            alt="logo-ai"
            width={50}
            height={50}
            className="mr-2"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
