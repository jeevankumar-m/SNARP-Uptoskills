import { useState } from "react";
import { Link } from "react-router-dom";
import {
  UptoSkillsLogo,
  LinkedinIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
  DiscordIcon,
  TelegramIcon,
  ShieldCheckIcon,
  MoonIcon
} from "./Icons";
import "./Footer.css";

export default function Footer() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <footer className="uptoskills-footer">
      <div className="footer-container">
        {/* =========================================================================
            TOP BRAND & MISSION (From UptoSkills Reference Screenshot)
            ========================================================================= */}
        <div className="footer-hero">
          <div className="footer-brand-header">
            <UptoSkillsLogo />
            <span className="footer-brand-slogan">Let&apos;s Make Freshers Employable!</span>
          </div>

          <h2 className="footer-heading">Connecting Colleges, Candidates, and Corporates</h2>
          <p className="footer-subtext">
            Empowering the next generation through AI-powered learning, social collaboration,
            and peer-reviewed research (SNARP).
          </p>
        </div>

        {/* =========================================================================
            ESSENTIAL NAVIGATION COLUMNS (Clean & Focused)
            ========================================================================= */}
        <div className="footer-columns">
          {/* Column 1: SNARP Platform */}
          <div className="footer-col">
            <h3 className="footer-col-title">
              <span className="col-icon">🚀</span> Platform
            </h3>
            <ul className="footer-links">
              <li><Link to="/">Academic Feed</Link></li>
              <li><Link to="/communities">Communities</Link></li>
              <li><Link to="/articles">Research Papers</Link></li>
              <li><Link to="/submit">Submit a Paper</Link></li>
              <li><Link to="/moderation">Moderation Queue</Link></li>
            </ul>
          </div>

          {/* Column 2: Resources & Guidelines */}
          <div className="footer-col">
            <h3 className="footer-col-title">
              <span className="col-icon">📖</span> Discover &amp; Guides
            </h3>
            <ul className="footer-links">
              <li><Link to="/guidelines">Submission Guidelines</Link></li>
              <li><Link to="/peer-review">Peer Review Process</Link></li>
              <li><Link to="/faq">Guides &amp; FAQ</Link></li>
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/conduct">Code of Conduct</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info (From Reference Screenshot) */}
          <div className="footer-col contact-col">
            <h3 className="footer-col-title">
              <span className="col-icon">🎧</span> Contact Info
            </h3>
            <ul className="footer-contact-list">
              <li>
                <span className="contact-pin">📍</span>
                <span>Palam, New Delhi, India</span>
              </li>
              <li>
                <span className="contact-pin">✉️</span>
                <a href="mailto:info@uptoskills.com">info@uptoskills.com</a>
              </li>
              <li>
                <span className="contact-pin">📞</span>
                <a href="tel:+919319772294">+91-9319772294</a>
              </li>
            </ul>
          </div>
        </div>

        {/* =========================================================================
            MIDDLE ROW: "Connect with us" & "Get More From Us"
            (Exact layout from the Reference Screenshot)
            ========================================================================= */}
        <div className="footer-social-row">
          <div className="social-connect-block">
            <h4 className="social-label">Connect with us</h4>
            <div className="social-icons-group">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/uptoskills"
                target="_blank"
                rel="noreferrer"
                className="social-btn linkedin"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <LinkedinIcon />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/uptoskills"
                target="_blank"
                rel="noreferrer"
                className="social-btn instagram"
                aria-label="Instagram"
                title="Instagram"
              >
                <InstagramIcon />
              </a>

              {/* X / Twitter */}
              <a
                href="https://twitter.com/uptoskills"
                target="_blank"
                rel="noreferrer"
                className="social-btn twitter"
                aria-label="X (Twitter)"
                title="X / Twitter"
              >
                <TwitterIcon />
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/@uptoskills"
                target="_blank"
                rel="noreferrer"
                className="social-btn youtube"
                aria-label="YouTube"
                title="YouTube"
              >
                <YoutubeIcon />
              </a>

              {/* Discord */}
              <a
                href="https://discord.gg/uptoskills"
                target="_blank"
                rel="noreferrer"
                className="social-btn discord"
                aria-label="Discord"
                title="Discord"
              >
                <DiscordIcon />
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/uptoskills"
                target="_blank"
                rel="noreferrer"
                className="social-btn telegram"
                aria-label="Telegram"
                title="Telegram"
              >
                <TelegramIcon />
              </a>
            </div>
          </div>

          {/* App / Store Badges (From Reference Screenshot) */}
          <div className="footer-badges-block">
            <h4 className="badges-label">Get More From Us</h4>
            <div className="badges-group">
              {/* Google Play */}
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noreferrer"
                className="store-badge"
                aria-label="Get it on Google Play"
              >
                <svg className="badge-logo" viewBox="0 0 24 24" fill="none">
                  <path d="M3.6 1.8L13.8 12 3.6 22.2c-.4-.3-.6-.8-.6-1.4V3.2c0-.6.2-1.1.6-1.4z" fill="#00E5FF"/>
                  <path d="M17.2 8.6L14.7 11 3.6 1.8c.3-.1.7-.1 1.1.1l12.5 6.7z" fill="#00E676"/>
                  <path d="M17.2 15.4L4.7 22.1c-.4.2-.8.2-1.1.1L14.7 13l2.5 2.4z" fill="#FF3D00"/>
                  <path d="M21.4 10.9l-4.2-2.3-2.5 2.4 2.5 2.4 4.2-2.3c.8-.5.8-1.7 0-2.2z" fill="#FFC400"/>
                </svg>
                <div className="badge-text">
                  <span className="badge-sub">GET IT ON</span>
                  <span className="badge-main">Google Play</span>
                </div>
              </a>

              {/* Google Search badge */}
              <a
                href="https://google.com/search?q=uptoskills"
                target="_blank"
                rel="noreferrer"
                className="store-badge google-search"
                aria-label="Prefer us on Google Search"
              >
                <svg className="badge-logo" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                <div className="badge-text">
                  <span className="badge-sub">PREFER US ON</span>
                  <span className="badge-main">Google Search</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div className="footer-divider"></div>

        {/* =========================================================================
            BOTTOM COPYRIGHT BAR (Exact match to Reference Screenshot 1)
            ========================================================================= */}
        <div className="footer-bottom-row">
          {/* Left: Copyright & Version */}
          <div className="copyright-group">
            <p className="copyright-line">
              Copyright &copy; 2026 <strong className="uptoskills-blue">UptoSkills</strong>
            </p>
            <p className="version-line">UptoSkills Version: v1.43.5</p>
          </div>

          {/* Center: Legal Links */}
          <div className="legal-links-group">
            <Link to="/terms">Terms &amp; Conditions</Link>
            <span className="legal-separator">|</span>
            <Link to="/privacy">Privacy Policy</Link>
            <span className="legal-separator">|</span>
            <Link to="/sitemap">Sitemap</Link>
          </div>

          {/* Right: Security & Dark mode indicator */}
          <div className="footer-meta-group">
            <div className="safe-badge">
              <ShieldCheckIcon />
              <span>100% Safe &amp; Secure</span>
            </div>

            <button
              className="darkmode-toggle-btn"
              onClick={toggleTheme}
              title="Toggle Dark Mode"
              aria-label="Toggle dark mode"
            >
              <MoonIcon />
              <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}