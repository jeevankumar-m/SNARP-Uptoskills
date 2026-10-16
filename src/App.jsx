import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

// Communities data matching Reference Screenshot 1
const SAMPLE_COMMUNITIES = [
  {
    id: "marketing",
    name: "Marketing",
    members: 32,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    bannerGradient: "linear-gradient(135deg, #ffd3b6 0%, #ffaaa5 100%)",
    tagline: "Growth marketing, brand positioning, and consumer analytics research."
  },
  {
    id: "uiux",
    name: "UI/UX",
    members: 25,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    bannerGradient: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
    tagline: "Design systems, human-computer interaction, and usability testing."
  },
  {
    id: "creative",
    name: "Creative",
    members: 12,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
    bannerGradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
    tagline: "Visual arts, multimedia storytelling, and generative design research."
  },
  {
    id: "success-story",
    name: "Success Story",
    members: 35,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80",
    bannerGradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    tagline: "Student founder journeys, published papers, and career milestones."
  },
  {
    id: "social-network",
    name: "Social network",
    members: 120,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    bannerGradient: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
    tagline: "Network science, social computing, and collaborative online learning."
  },
  {
    id: "technical-expert",
    name: "Technical Expert",
    members: 42,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    bannerGradient: "linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)",
    tagline: "AI algorithms, distributed systems, and open-source scientific code."
  }
];

// Home / Feed Page with Communities Showcase
function FeedPage() {
  const [joined, setJoined] = useState({});

  const toggleJoin = (id) => {
    setJoined((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="page-container">
      {/* Feed Hero Banner */}
      <div className="feed-header-banner">
        <div>
          <span className="banner-badge">🚀 SNARP MVP · Uptoskills Internship</span>
          <h1 className="feed-header-title">Social Networking &amp; Academic Research Platform</h1>
          <p className="feed-header-subtitle">
            Share updates, discover peer-reviewed research, publish blogs, and connect
            with academic communities — all in one unified platform.
          </p>
        </div>
        <Link to="/submit" className="banner-action-btn">
          <span>+ Submit a Paper</span>
        </Link>
      </div>

      {/* Communities Section (Matching Reference Screenshot 1) */}
      <div className="communities-section">
        <div className="communities-section-header">
          <div className="section-title-wrap">
            <h2 className="section-heading">Featured Communities</h2>
            <div className="view-toggles">
              <button className="view-btn active" title="Grid View">⊞ Grid</button>
              <button className="view-btn" title="List View">☰ List</button>
            </div>
          </div>
          <span style={{ fontSize: "0.88rem", color: "var(--ink-soft)" }}>
            Sort by: <strong>All Communities ▾</strong>
          </span>
        </div>

        <div className="communities-grid">
          {SAMPLE_COMMUNITIES.map((item) => (
            <div key={item.id} className="community-card">
              <div
                className="card-banner"
                style={{ background: item.bannerGradient }}
              />
              <div className="card-body">
                <img src={item.avatar} alt={item.name} className="card-avatar" />
                <div className="card-meta">
                  <h3 className="card-title">{item.name}</h3>
                  <p className="card-members">{item.members} members</p>
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", marginBottom: "16px", lineHeight: "1.4" }}>
                  {item.tagline}
                </p>
                <button
                  className={`card-btn-join ${joined[item.id] ? "joined" : ""}`}
                  onClick={() => toggleJoin(item.id)}
                >
                  {joined[item.id] ? "✓ Joined" : "Join Community"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Generic Placeholder for Team routes
function PlaceholderPage({ title, roadmapWeek, description }) {
  return (
    <div className="page-container">
      <div className="placeholder-page">
        <span className="placeholder-badge">{roadmapWeek || "Roadmap Deliverable"}</span>
        <h1 className="placeholder-title">{title}</h1>
        <p className="placeholder-desc">
          {description ||
            "This view is connected to the SNARP routing architecture. In future weeks, teammates will integrate live backend APIs and database queries."}
        </p>
        <div className="roadmap-ref-box">
          <strong>📋 SNARP Roadmap Reference:</strong>
          <span>
            Refer to <code>social_Academic_Research_Platform_Roadmap.docx</code> for database schema,
            PostgreSQL BYTEA storage, and authentication contracts.
          </span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        {/* Modern Sticky Navbar with Mobile Drawer & Bottom Navigation */}
        <Navbar />

        {/* Routed Page Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<FeedPage />} />
            <Route
              path="/communities"
              element={
                <PlaceholderPage
                  title="Academic Communities"
                  roadmapWeek="Week 2: Content Workflows"
                  description="Explore and join specialized research communities, connect with co-authors, and participate in peer discussions."
                />
              }
            />
            <Route
              path="/articles"
              element={
                <PlaceholderPage
                  title="Research Papers & Articles"
                  roadmapWeek="Week 3: PDF Viewer & Discovery"
                  description="Browse approved peer-reviewed research papers, generate APA/BibTeX citations, and view verified academic PDFs."
                />
              }
            />
            <Route
              path="/events"
              element={
                <PlaceholderPage
                  title="Events & Academic Webinars"
                  roadmapWeek="Week 2: Community Modules"
                  description="Stay informed about upcoming research conferences, student hackathons, paper defense sessions, and workshops."
                />
              }
            />
            <Route
              path="/tools"
              element={
                <PlaceholderPage
                  title="Research Tools & Citations"
                  roadmapWeek="Week 3: Citations Engine"
                  description="APA and BibTeX citation generator, DOI metadata lookup, plagiarism check integration, and research export."
                />
              }
            />
            <Route
              path="/submit"
              element={
                <PlaceholderPage
                  title="Submit a Research Paper"
                  roadmapWeek="Week 2 & 3: Paper Upload Workflow"
                  description="Authors can submit paper metadata (Title, Abstract, DOI, Tags, Co-authors) and upload PDF binaries stored in PostgreSQL BYTEA."
                />
              }
            />
            <Route
              path="/moderation"
              element={
                <PlaceholderPage
                  title="Moderator Dashboard"
                  roadmapWeek="Week 3: Moderation Workflow"
                  description="Review pending submissions, inspect paper metadata, and approve or reject papers before they appear in public feeds."
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <PlaceholderPage
                  title="Author Dashboard"
                  roadmapWeek="Week 2: User Dashboards"
                  description="Track submission status, peer review feedback, read counts, and community engagement analytics."
                />
              }
            />
            <Route
              path="/login"
              element={
                <PlaceholderPage
                  title="Log In"
                  roadmapWeek="Week 1: Authentication"
                  description="JWT token-based authentication with bcrypt password verification and role-checking middleware."
                />
              }
            />
            <Route
              path="/signup"
              element={
                <PlaceholderPage
                  title="Create an Account"
                  roadmapWeek="Week 1: Registration"
                  description="Sign up as a Student, Researcher, or Author with role assignment and email verification."
                />
              }
            />
            <Route
              path="/settings"
              element={
                <PlaceholderPage
                  title="Account Settings"
                  roadmapWeek="Week 1 & 4: Settings"
                  description="Manage your author profile, academic affiliation, notification preferences, and security credentials."
                />
              }
            />
            <Route
              path="/guidelines"
              element={
                <PlaceholderPage
                  title="Submission Guidelines"
                  roadmapWeek="Platform Rules"
                  description="Standards for peer-reviewed research, ethical publishing, formatting requirements, and review criteria."
                />
              }
            />
            <Route
              path="/search"
              element={
                <PlaceholderPage
                  title="Search Results"
                  roadmapWeek="Week 4: Full-Text Search"
                  description="PostgreSQL full-text search across titles, abstracts, authors, domains, and research tags."
                />
              }
            />
          </Routes>
        </main>

        {/* UptoSkills Dark Navy Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}