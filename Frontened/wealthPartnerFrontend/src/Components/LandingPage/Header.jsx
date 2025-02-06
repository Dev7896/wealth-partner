import { HashLink } from "react-router-hash-link";
import React from 'react'
import { useRef , useState , useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const sidePanelRef = useRef(null);

  const toggleSidePanel = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
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
    <header className="animate-bounceIn sticky top-0 z-50 bg-white">
      <div className="logo">
        <HashLink to="/" className="link-logo">
          Wealth <br /> Partner
        </HashLink>
      </div>
      <nav className="nav-links">
        <ul className="links">
          <li>
            <HashLink smooth to="/#home" onClick={toggleSidePanel}>
              Home
            </HashLink>
          </li>
          <li>
            <HashLink smooth to="/#services" onClick={toggleSidePanel}>
              Services
            </HashLink>
          </li>
          <li>
            <HashLink smooth to="/#faq" onClick={toggleSidePanel}>
              FAQ
            </HashLink>
          </li>
          <li>
            <HashLink smooth to="/#contacts" onClick={toggleSidePanel}>
              Contact
            </HashLink>
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
                <HashLink smooth to="/#home" onClick={toggleSidePanel}>
                  Home
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#services" onClick={toggleSidePanel}>
                  Services
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#faq" onClick={toggleSidePanel}>
                  FAQ
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#contacts" onClick={toggleSidePanel}>
                  Contact
                </HashLink>
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
