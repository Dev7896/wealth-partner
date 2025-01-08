import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../styles/LandingPage.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const sidePanelRef = useRef(null);

  const toggleSidePanel = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Ensure the click is outside the side panel and the hamburger button
      if (
        sidePanelRef.current &&
        !sidePanelRef.current.contains(event.target) &&
        !event.target.closest(".hamburger")
      ) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  return (
    <header>
      <div className="logo">
        <Link to="/" className="link-logo">
          Wealth <br /> Partner
        </Link>
      </div>
      <nav className="nav-links">
        <ul className="links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <button className="login-btn">
          <Link to="/login">Login</Link>
        </button>
      </nav>
      <div className="hamburger" onClick={toggleSidePanel}>
        {isOpen ? (
          <i className="ri-close-large-line"></i>
        ) : (
          <i className="ri-menu-line"></i>
        )}
      </div>
      <div className="overlay"></div>
      {isOpen && (
        <div
          className={`side-panel ${isOpen ? "open" : ""}`}
          ref={sidePanelRef}
        >
          <nav>
            <ul className="links">
              <li>
                <Link to="/" onClick={toggleSidePanel}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={toggleSidePanel}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={toggleSidePanel}>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={toggleSidePanel}>
                  Contact
                </Link>
              </li>
              <li>
                <button className="login-btn">
                  <Link to="/login" onClick={toggleSidePanel}>
                    Login
                  </Link>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
