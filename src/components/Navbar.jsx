import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  LogoIcon,
  SearchIcon,
  MailIcon,
  BellIcon,
  FeedIcon,
  DashboardIcon,
  CommunityIcon,
  ArticleIcon,
  CalendarIcon,
  ToolsIcon,
  SettingsIcon,
  HelpIcon,
  LogoutIcon,
  UserIcon,
  PlusIcon,
  ChevronDownIcon,
  CloseIcon,
  MenuIcon
} from "./Icons";
import "./Navbar.css";

// Demo user profiles (including Liyana from the reference design)
const DEMO_PROFILES = {
  author: {
    name: "Liyana",
    fullName: "Liyana Chen",
    email: "liyana.chen@uptoskills.edu",
    role: "author",
    roleLabel: "Research Author",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    unreadMessages: 2,
    unreadAlerts: 3
  },
  moderator: {
    name: "Ravi",
    fullName: "Ravi Kumar",
    email: "ravi.mod@uptoskills.edu",
    role: "moderator",
    roleLabel: "Moderator",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    unreadMessages: 5,
    unreadAlerts: 8
  },
  guest: null
};

export default function Navbar({ currentUser = "author", onUserChange }) {
  // Current user state (defaults to "author" - Liyana from Image 1)
  const [userRole, setUserRole] = useState(currentUser);
  const user = DEMO_PROFILES[userRole];

  // UI state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  // Refs for outside click handling
  const profileRef = useRef(null);
  const messagesRef = useRef(null);
  const alertsRef = useRef(null);

  // Helper to close all floating panels
  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    setMessagesOpen(false);
    setAlertsOpen(false);
  };

  // Handle sticky scroll elevation shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(e.target)) {
        setMessagesOpen(false);
      }
      if (alertsRef.current && !alertsRef.current.contains(e.target)) {
        setAlertsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setProfileDropdownOpen(false);
        setMessagesOpen(false);
        setAlertsOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleRoleSwitch = (newRole) => {
    setUserRole(newRole);
    if (onUserChange) onUserChange(newRole);
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const canModerate = user && (user.role === "moderator" || user.role === "admin");
  const canSubmit = user && ["author", "moderator", "admin"].includes(user.role);

  return (
    <>
      {/* =========================================================================
          TOP NAVBAR
          ========================================================================= */}
      <header className={`navbar-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="navbar-container">
          {/* 1. BRAND LOGO */}
          <div className="navbar-left">
            <button
              className="navbar-mobile-toggle"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

            <Link to="/" className="navbar-brand" aria-label="SNARP Home" onClick={closeAllMenus}>
              <LogoIcon className="navbar-brand-icon" />
              <div className="navbar-brand-text">
                <span className="navbar-brand-name">SNARP</span>
                <span className="navbar-brand-badge">Uptoskills</span>
              </div>
            </Link>
          </div>

          {/* 2. SEARCH BAR (Matching Reference Design) */}
          <div className="navbar-center">
            <form className="navbar-search-form" role="search" onSubmit={handleSearchSubmit}>
              <SearchIcon className="navbar-search-icon" />
              <input
                type="search"
                className="navbar-search-input"
                placeholder="Search papers, communities, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search papers and communities"
              />
              {searchQuery ? (
                <button
                  type="button"
                  className="navbar-search-clear"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search query"
                >
                  <CloseIcon />
                </button>
              ) : (
                <kbd className="navbar-search-kbd">⌘K</kbd>
              )}
            </form>
          </div>

          {/* 3. DESKTOP NAVIGATION LINKS */}
          <nav className="navbar-desktop-nav" aria-label="Main Navigation">
            <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeAllMenus}>
              <FeedIcon />
              <span>Feed</span>
            </NavLink>
            <NavLink to="/communities" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeAllMenus}>
              <CommunityIcon />
              <span>Communities</span>
            </NavLink>
            <NavLink to="/articles" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeAllMenus}>
              <ArticleIcon />
              <span>Articles</span>
            </NavLink>
            <NavLink to="/events" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeAllMenus}>
              <CalendarIcon />
              <span>Events</span>
            </NavLink>
            {canModerate && (
              <NavLink to="/moderation" className={({ isActive }) => `nav-link mod-link ${isActive ? "active" : ""}`} onClick={closeAllMenus}>
                <span className="nav-badge-pill">Mod</span>
                <span>Moderation</span>
              </NavLink>
            )}
          </nav>

          {/* 4. NAVBAR RIGHT (Messages, Alerts, Profile & CTA) */}
          <div className="navbar-right">
            {user ? (
              <>
                {/* Submit Paper CTA */}
                {canSubmit && (
                  <Link to="/submit" className="navbar-btn-cta desktop-only">
                    <PlusIcon />
                    <span>Submit Paper</span>
                  </Link>
                )}

                {/* Messages Dropdown */}
                <div className="navbar-popover-wrapper" ref={messagesRef}>
                  <button
                    className={`navbar-icon-btn ${messagesOpen ? "is-active" : ""}`}
                    aria-label="Messages"
                    aria-expanded={messagesOpen}
                    onClick={() => {
                      setMessagesOpen(!messagesOpen);
                      setAlertsOpen(false);
                      setProfileDropdownOpen(false);
                    }}
                  >
                    <MailIcon />
                    {user.unreadMessages > 0 && (
                      <span className="navbar-badge-dot" aria-label={`${user.unreadMessages} unread messages`}>
                        {user.unreadMessages}
                      </span>
                    )}
                  </button>

                  {messagesOpen && (
                    <div className="navbar-dropdown-panel messages-panel">
                      <div className="dropdown-panel-header">
                        <h3>Messages</h3>
                        <span className="dropdown-count">{user.unreadMessages} New</span>
                      </div>
                      <div className="dropdown-panel-list">
                        <div className="dropdown-item message-item unread">
                          <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80"
                            alt="Asha"
                            className="item-avatar"
                          />
                          <div className="item-content">
                            <p className="item-title">Dr. Asha Sen</p>
                            <p className="item-snippet">Your peer review notes for the quantum paper are ready.</p>
                            <span className="item-time">10m ago</span>
                          </div>
                        </div>
                        <div className="dropdown-item message-item unread">
                          <img
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80"
                            alt="Vikram"
                            className="item-avatar"
                          />
                          <div className="item-content">
                            <p className="item-title">Vikram (UI/UX Community)</p>
                            <p className="item-snippet">Welcome to the design system discussion board!</p>
                            <span className="item-time">1h ago</span>
                          </div>
                        </div>
                      </div>
                      <div className="dropdown-panel-footer">
                        <Link to="/messages" onClick={() => setMessagesOpen(false)}>View all messages</Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Notifications Dropdown */}
                <div className="navbar-popover-wrapper" ref={alertsRef}>
                  <button
                    className={`navbar-icon-btn ${alertsOpen ? "is-active" : ""}`}
                    aria-label="Notifications"
                    aria-expanded={alertsOpen}
                    onClick={() => {
                      setAlertsOpen(!alertsOpen);
                      setMessagesOpen(false);
                      setProfileDropdownOpen(false);
                    }}
                  >
                    <BellIcon />
                    {user.unreadAlerts > 0 && (
                      <span className="navbar-badge-dot" aria-label={`${user.unreadAlerts} unread notifications`}>
                        {user.unreadAlerts}
                      </span>
                    )}
                  </button>

                  {alertsOpen && (
                    <div className="navbar-dropdown-panel alerts-panel">
                      <div className="dropdown-panel-header">
                        <h3>Notifications</h3>
                        <span className="dropdown-count">{user.unreadAlerts} New</span>
                      </div>
                      <div className="dropdown-panel-list">
                        <div className="dropdown-item alert-item unread">
                          <div className="item-icon-circle green">✓</div>
                          <div className="item-content">
                            <p className="item-snippet">Paper &quot;Generative UI Systems&quot; accepted for review.</p>
                            <span className="item-time">25m ago</span>
                          </div>
                        </div>
                        <div className="dropdown-item alert-item unread">
                          <div className="item-icon-circle pink">♥</div>
                          <div className="item-content">
                            <p className="item-snippet">Darlene Robertson liked your community reply.</p>
                            <span className="item-time">2h ago</span>
                          </div>
                        </div>
                        <div className="dropdown-item alert-item">
                          <div className="item-icon-circle blue">👥</div>
                          <div className="item-content">
                            <p className="item-snippet">12 new researchers joined the Creative Community.</p>
                            <span className="item-time">5h ago</span>
                          </div>
                        </div>
                      </div>
                      <div className="dropdown-panel-footer">
                        <Link to="/notifications" onClick={() => setAlertsOpen(false)}>Mark all as read</Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile Pill & Dropdown (Matching "Hi Liyana" in Image 1) */}
                <div className="navbar-popover-wrapper" ref={profileRef}>
                  <button
                    className={`navbar-user-pill ${profileDropdownOpen ? "is-active" : ""}`}
                    aria-expanded={profileDropdownOpen}
                    onClick={() => {
                      setProfileDropdownOpen(!profileDropdownOpen);
                      setMessagesOpen(false);
                      setAlertsOpen(false);
                    }}
                  >
                    <div className="user-avatar-wrapper">
                      <img src={user.avatar} alt={user.fullName} className="user-avatar-img" />
                      <span className="user-online-dot"></span>
                    </div>
                    <span className="user-greeting">Hi {user.name}</span>
                    <ChevronDownIcon className={`user-chevron ${profileDropdownOpen ? "open" : ""}`} />
                  </button>

                  {profileDropdownOpen && (
                    <div className="navbar-dropdown-panel profile-panel">
                      <div className="profile-panel-header">
                        <img src={user.avatar} alt={user.fullName} className="profile-panel-avatar" />
                        <div className="profile-panel-info">
                          <h4 className="profile-name">{user.fullName}</h4>
                          <p className="profile-email">{user.email}</p>
                          <span className="profile-role-badge">{user.roleLabel}</span>
                        </div>
                      </div>

                      <div className="profile-panel-menu">
                        <NavLink to="/dashboard" className="profile-menu-item" onClick={() => setProfileDropdownOpen(false)}>
                          <DashboardIcon />
                          <span>My Dashboard</span>
                        </NavLink>
                        <NavLink to="/settings" className="profile-menu-item" onClick={() => setProfileDropdownOpen(false)}>
                          <SettingsIcon />
                          <span>Settings</span>
                        </NavLink>
                        <NavLink to="/help" className="profile-menu-item" onClick={() => setProfileDropdownOpen(false)}>
                          <HelpIcon />
                          <span>Help Center</span>
                        </NavLink>
                      </div>

                      {/* Demo Switcher - Allows user & reviewer to test every role */}
                      <div className="profile-panel-switcher">
                        <p className="switcher-label">TEST DEMO ROLES:</p>
                        <div className="switcher-buttons">
                          <button
                            className={`switcher-btn ${userRole === "author" ? "active" : ""}`}
                            onClick={() => handleRoleSwitch("author")}
                          >
                            Author (Liyana)
                          </button>
                          <button
                            className={`switcher-btn ${userRole === "moderator" ? "active" : ""}`}
                            onClick={() => handleRoleSwitch("moderator")}
                          >
                            Moderator (Ravi)
                          </button>
                          <button
                            className="switcher-btn logout-opt"
                            onClick={() => handleRoleSwitch("guest")}
                          >
                            Log out (Guest)
                          </button>
                        </div>
                      </div>

                      <div className="profile-panel-footer">
                        <button className="profile-logout-btn" onClick={() => handleRoleSwitch("guest")}>
                          <LogoutIcon />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* GUEST STATE */
              <div className="navbar-guest-actions">
                {/* Quick login role selector for testing */}
                <button
                  className="navbar-demo-login-btn"
                  title="Quick login as Liyana for preview"
                  onClick={() => handleRoleSwitch("author")}
                >
                  Demo Login
                </button>
                <NavLink to="/login" className="navbar-btn-ghost">
                  Log in
                </NavLink>
                <Link to="/signup" className="navbar-btn-primary">
                  Create account
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* =========================================================================
          MOBILE DRAWER / SIDEBAR (Matching Left Sidebar in Image 1)
          ========================================================================= */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <aside className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            {/* Drawer Header */}
            <div className="drawer-header">
              <Link to="/" className="navbar-brand" onClick={() => setMobileMenuOpen(false)}>
                <LogoIcon className="navbar-brand-icon" />
                <span className="navbar-brand-name">SNARP</span>
              </Link>
              <button
                className="drawer-close-btn"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                <CloseIcon />
              </button>
            </div>

            {/* User Profile Card (if logged in) */}
            {user ? (
              <div className="drawer-user-card">
                <img src={user.avatar} alt={user.fullName} className="drawer-avatar" />
                <div className="drawer-user-details">
                  <p className="drawer-user-name">Hi {user.name} 👋</p>
                  <p className="drawer-user-role">{user.roleLabel}</p>
                </div>
              </div>
            ) : (
              <div className="drawer-auth-box">
                <button
                  className="drawer-demo-login"
                  onClick={() => handleRoleSwitch("author")}
                >
                  ⚡ Fast Login as Liyana
                </button>
                <div className="drawer-auth-row">
                  <NavLink to="/login" className="drawer-btn-secondary" onClick={() => setMobileMenuOpen(false)}>
                    Log in
                  </NavLink>
                  <Link to="/signup" className="drawer-btn-primary" onClick={() => setMobileMenuOpen(false)}>
                    Create account
                  </Link>
                </div>
              </div>
            )}

            {/* Mobile Search */}
            <form className="drawer-search-form" onSubmit={handleSearchSubmit}>
              <SearchIcon className="navbar-search-icon" />
              <input
                type="search"
                placeholder="Search SNARP..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            {/* Drawer Navigation Links */}
            <div className="drawer-nav-section">
              <p className="drawer-section-title">MENU</p>
              <NavLink to="/" end className="drawer-nav-item" onClick={() => setMobileMenuOpen(false)}>
                <FeedIcon />
                <span>Feed</span>
              </NavLink>
              <NavLink to="/dashboard" className="drawer-nav-item" onClick={() => setMobileMenuOpen(false)}>
                <DashboardIcon />
                <span>Dashboard</span>
              </NavLink>
              <NavLink to="/communities" className="drawer-nav-item" onClick={() => setMobileMenuOpen(false)}>
                <CommunityIcon />
                <span>Communities</span>
                <span className="drawer-pill">Hot</span>
              </NavLink>
              <NavLink to="/articles" className="drawer-nav-item" onClick={() => setMobileMenuOpen(false)}>
                <ArticleIcon />
                <span>Articles</span>
              </NavLink>
              <NavLink to="/events" className="drawer-nav-item" onClick={() => setMobileMenuOpen(false)}>
                <CalendarIcon />
                <span>Events</span>
              </NavLink>
              <NavLink to="/tools" className="drawer-nav-item" onClick={() => setMobileMenuOpen(false)}>
                <ToolsIcon />
                <span>Tools</span>
              </NavLink>
              {canSubmit && (
                <NavLink to="/submit" className="drawer-nav-item submit-highlight" onClick={() => setMobileMenuOpen(false)}>
                  <PlusIcon />
                  <span>Submit a Paper</span>
                </NavLink>
              )}
              {canModerate && (
                <NavLink to="/moderation" className="drawer-nav-item mod-item" onClick={() => setMobileMenuOpen(false)}>
                  <span className="mod-badge">Admin</span>
                  <span>Moderation</span>
                </NavLink>
              )}
            </div>

            {/* Secondary Settings Links */}
            <div className="drawer-nav-section secondary">
              <p className="drawer-section-title">PREFERENCES</p>
              <NavLink to="/settings" className="drawer-nav-item" onClick={() => setMobileMenuOpen(false)}>
                <SettingsIcon />
                <span>Settings</span>
              </NavLink>
              <NavLink to="/help" className="drawer-nav-item" onClick={() => setMobileMenuOpen(false)}>
                <HelpIcon />
                <span>Help Center</span>
              </NavLink>

              {user ? (
                <button
                  className="drawer-nav-item logout-link"
                  onClick={() => handleRoleSwitch("guest")}
                >
                  <LogoutIcon />
                  <span>Logout</span>
                </button>
              ) : null}
            </div>
          </aside>
        </div>
      )}

      {/* =========================================================================
          MOBILE BOTTOM NAVIGATION BAR (Matching Reference Images 2 & 3)
          ========================================================================= */}
      <nav className="mobile-bottom-bar" aria-label="Mobile Bottom Navigation">
        {/* Tab 1: Home / Feed */}
        <NavLink
          to="/"
          end
          className={({ isActive }) => `bottom-tab ${isActive ? "active" : ""}`}
          aria-label="Feed"
        >
          <FeedIcon className="bottom-tab-icon" />
          <span className="bottom-tab-label">Feed</span>
        </NavLink>

        {/* Tab 2: Communities / Search */}
        <NavLink
          to="/communities"
          className={({ isActive }) => `bottom-tab ${isActive ? "active" : ""}`}
          aria-label="Communities"
        >
          <CommunityIcon className="bottom-tab-icon" />
          <span className="bottom-tab-label">Explore</span>
        </NavLink>

        {/* Tab 3: Center Elevated Action (+) Button */}
        <Link
          to={user ? "/submit" : "/login"}
          className="bottom-tab-center-action"
          aria-label="Submit new post or paper"
        >
          <div className="center-action-btn">
            <PlusIcon className="center-action-icon" />
          </div>
        </Link>

        {/* Tab 4: Articles / Alerts */}
        <NavLink
          to="/articles"
          className={({ isActive }) => `bottom-tab ${isActive ? "active" : ""}`}
          aria-label="Articles"
        >
          <ArticleIcon className="bottom-tab-icon" />
          <span className="bottom-tab-label">Articles</span>
        </NavLink>

        {/* Tab 5: Profile / Menu toggle */}
        <button
          className={`bottom-tab ${mobileMenuOpen ? "active" : ""}`}
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Account and Menu"
        >
          {user ? (
            <img src={user.avatar} alt="Account" className="bottom-tab-avatar" />
          ) : (
            <UserIcon className="bottom-tab-icon" />
          )}
          <span className="bottom-tab-label">{user ? "Me" : "Menu"}</span>
        </button>
      </nav>
    </>
  );
}
