import { useState, useEffect } from "react";
import Login from "../Login";
import Signup from "../Signup";

// Auth Page wrapper providing the brand panel and switching between Login / Signup
export default function AuthPage({ initialMode = "login" }) {
  const [page, setPage] = useState(
    location.hash || (initialMode === "signup" ? "#signup" : "#login")
  );

  useEffect(() => {
    const onHash = () => setPage(location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div className="login-page-wrapper">
      <div className="login">
        <section className="brand-panel" aria-hidden="true">
          <div className="brand-copy">
            <span className="eyebrow">Social &amp; Academic Research Platform</span>
            <h2>Share ideas. Publish research. Grow together.</h2>
            <ul>
              <li>
                <span className="dot teal" />
                Post updates and blogs with your community
              </li>
              <li>
                <span className="dot orange" />
                Submit papers for moderated review
              </li>
              <li>
                <span className="dot blue" />
                Search, read and cite approved research
              </li>
            </ul>
          </div>
        </section>

        <section className="form-panel">
          {page === "#signup" || initialMode === "signup" ? <Signup /> : <Login />}
        </section>
      </div>
    </div>
  );
}
