import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import "./App.css";
import AppRouter from "./AppRouter";

function App() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("Home");
  const textAniActive = useRef(false);
  const homeAsideInfoAniActive = useRef(false);
  const cardsAniActive = useRef(false);
  const asideStyleInfo = useRef(["-200%", "0"]);
  const cardStyleInfo = useRef(["25%", "0"]);
  const aboutPartStyleInfo = useRef(["25%", "0"]);
  const titleStyling = useRef([]);
  const offeringsAniActive = useRef(false);
  const offeringsStyleInfo = useRef(0);
  const info = useRef([
    textAniActive,
    homeAsideInfoAniActive,
    cardsAniActive,
    setCurrentPage,
    asideStyleInfo,
    cardStyleInfo,
    titleStyling,
    offeringsAniActive,
    offeringsStyleInfo,
  ]);

  // Set the service you want to learn more about
  const [learning, setLearning] = useState("default");

  useEffect(() => {
    const path = location.pathname.replace("/", "") || "Home";
    setCurrentPage(path.charAt(0).toUpperCase() + path.slice(1)); // Capitalize page name
    window.scrollTo(0, 0);
  }, [location]);

  // Set the current page
  function setPage(page) {
    if (page === "Services") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setLearning("default");
    } else if (currentPage === page) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  // Handle the phone nav click
  const [menuOpen, setMenuOpen] = useState(false);
  const handlePhoneNavClick = useCallback(() => {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  }, [menuOpen]);
  useEffect(() => {
    let page = null;

    switch (currentPage) {
      case "Home":
        page = document.querySelector(".home-grid-container");
        break;
      case "About":
        page = document.querySelector(".about-grid-container");
        break;
      case "Services":
        page = document.querySelector(".services-grid-container");
        break;
      case "Contact":
        page = document.querySelector(".contact-grid-container");
        break;
      default:
        page = document.querySelector(".home-grid-container");
        break;
    }

    if (menuOpen && page) {
      page.addEventListener("click", handlePhoneNavClick);
    } else if (page) {
      page.removeEventListener("click", handlePhoneNavClick);
    }
  }, [menuOpen, handlePhoneNavClick, currentPage]);

  return (
    <>
      <header>
        <Link className="logo" to="/">
          <img src="/favicon.webp" alt="Logo" />
          <h1>| Leffler WebDev</h1>
        </Link>
        <a href="tel:+12528763653" id="hiddenNum">
          <i className="fa-solid fa-phone"></i>
          <p>(252)-876-3653</p>
        </a>
        <nav className="deskNav">
          <Link
            className={`navLink ${
              currentPage === "Home" ? "activeLink" : "inactiveLink"
            }`}
            onClick={() => setPage("Contact")}
            to="/"
          >
            Home
          </Link>
          <Link
            className={`navLink ${
              currentPage === "About" ? "activeLink" : "inactiveLink"
            }`}
            onClick={() => setPage("Contact")}
            to="/about"
          >
            About
          </Link>
          <Link
            className={`navLink ${
              currentPage === "Services" ? "activeLink" : "inactiveLink"
            }`}
            onClick={() => setPage("Contact")}
            to="/services"
          >
            Services
          </Link>
          <Link
            className={`navLink ${
              currentPage === "Contact" ? "activeLink" : "inactiveLink"
            }`}
            onClick={() => setPage("Contact")}
            to="/contact"
          >
            Contact
          </Link>
          <a href="tel:+12528763653" style={{ textDecoration: "none" }}>
            <button className="phoneNumber">
              <i className="fa-solid fa-phone"></i>
              <p>(252)-876-3653</p>
            </button>
          </a>
        </nav>
        <nav
          className={`phoneNav ${menuOpen ? "phoneNavOpen" : ""}`}
          onClick={handlePhoneNavClick}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </nav>
        <div className={`hiddenMenu ${menuOpen ? "hiddenOpen" : ""}`}>
          <Link
            className={`navLink ${
              currentPage === "Home" ? "phoneActiveLink" : "inactiveLink"
            }`}
            onClick={() => {
              setPage("Contact");
              handlePhoneNavClick();
            }}
            to="/"
          >
            Home
          </Link>
          <Link
            className={`navLink ${
              currentPage === "About" ? "phoneActiveLink" : "inactiveLink"
            }`}
            onClick={() => {
              setPage("Contact");
              handlePhoneNavClick();
            }}
            to="/about"
          >
            About
          </Link>
          <Link
            className={`navLink ${
              currentPage === "Services" ? "phoneActiveLink" : "inactiveLink"
            }`}
            onClick={() => {
              setPage("Contact");
              handlePhoneNavClick();
            }}
            to="/services"
          >
            Services
          </Link>
          <Link
            className={`navLink ${
              currentPage === "Contact" ? "phoneActiveLink" : "inactiveLink"
            }`}
            onClick={() => {
              setPage("Contact");
              handlePhoneNavClick();
            }}
            to="/contact"
          >
            Contact
          </Link>
        </div>
      </header>
      <AppRouter
        info={info.current}
        aboutInfo={{
          aboutPartStyleInfo: aboutPartStyleInfo,
          setCurrentPage: setCurrentPage,
        }}
        servicesInfo={{
          learning: learning,
          setLearning: setLearning,
          setCurrentPage: setCurrentPage,
        }}
      />
      <footer>
        <h2>Leffler WebDev &copy; 2024</h2>
        <Link onClick={() => setPage("Contact")} to="/contact">
          Contact Us
        </Link>
      </footer>
    </>
  );
}

export default App;
