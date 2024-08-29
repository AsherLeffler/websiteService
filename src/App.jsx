import { useEffect, useRef, useState } from "react";
import "./App.css";

// Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";

function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const textAniActive = useRef(false);
  const homeAsideInfoAniActive = useRef(false);
  const cardsAniActive = useRef(false);
  const asideStyleInfo = useRef(["-200%", "0"]);
  const cardStyleInfo = useRef(["25%", "0"]);
  const aboutPartStyleInfo = useRef(["25%", "0"]);

  // Set the service you want to learn more about
  const [learning, setLearning] = useState("default");

  // Find the current Page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "Home":
        return (
          <HomePage
            textAniActive={textAniActive}
            homeAsideInfoAniActive={homeAsideInfoAniActive}
            cardsAniActive={cardsAniActive}
            setCurrentPage={setCurrentPage}
            asideStyleInfo={asideStyleInfo}
            cardStyleInfo={cardStyleInfo}
          />
        );
      case "About":
        return (
          <AboutPage
            aboutPartStyleInfo={aboutPartStyleInfo}
            setCurrentPage={setCurrentPage}
          />
        );
      case "Services":
        return (
          <ServicesPage
            learning={learning}
            setLearning={setLearning}
            setCurrentPage={setCurrentPage}
          />
        );
      case "Contact":
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  // Go back to the home page and reload the page
  function goHome() {
    setCurrentPage("Home");
    window.location.reload();
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    window.scroll(0, 0);
  }, [currentPage]);

  // Set the current page
  function setPage(page) {
    if (page === "Services") {
      setCurrentPage(page);
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
    } else {
      setCurrentPage(page);
    }
  }

  return (
    <>
      <header>
        <button className="logo" onClick={goHome}>
          <img src="/favicon.png" alt="Logo" />
          <h1>| Leffler WebDev</h1>
        </button>
        <nav>
          <a
            className={`navLink ${
              currentPage === "Home" ? "pageUnderline" : ""
            }`}
            onClick={() => setPage("Home")}
          >
            Home
          </a>
          <a
            className={`navLink ${
              currentPage === "About" ? "pageUnderline" : ""
            }`}
            onClick={() => setPage("About")}
          >
            About
          </a>
          <a
            className={`navLink ${
              currentPage === "Services" ? "pageUnderline" : ""
            }`}
            onClick={() => setPage("Services")}
          >
            Services
          </a>
          <a
            className={`navLink ${
              currentPage === "Contact" ? "pageUnderline" : ""
            }`}
            onClick={() => setPage("Contact")}
          >
            Contact
          </a>
          <div className="phoneNumber">
            <i className="fa-solid fa-phone"></i>
            <a href="tel:+12528763653">
              <p>(252)-876-3653</p>
            </a>
          </div>
        </nav>
      </header>
      {renderCurrentPage()}
      <footer>
        <h2>Leffler WebDev &copy; 2024</h2>
        <a onClick={() => setCurrentPage("Contact")}>Contact Us</a>
      </footer>
    </>
  );
}

export default App;
