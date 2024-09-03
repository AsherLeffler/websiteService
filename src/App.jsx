import { useEffect, useRef, useState } from "react";
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

  // Go back to the home page and reload the page
  function goHome() {
    setCurrentPage("Home");
    window.scrollTo(0, 0);
  }

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

  return (
    <>
      <header>
        <button className="logo" onClick={goHome}>
          <img src="/favicon.webp" alt="Logo" />
          <h1>| Leffler WebDev</h1>
        </button>
        <nav>
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
        <Link
          onClick={() => setPage("Contact")}
          to="/contact"
        >
          Contact Us
        </Link>
      </footer>
    </>
  );
}

export default App;
