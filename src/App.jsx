import { useEffect, useRef, useState } from "react";
import "./App.css";

// Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/PricingPage";
import ContactPage from "./pages/ContactPage";
import PricingPage from "./pages/PricingPage";

function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const textAniActive = useRef(false);
  const homeAsideInfoAniActive = useRef(false);
  const cardsAniActive = useRef(false);
  const asideStyleInfo = useRef(["-200%", "0"]);
  const cardStyleInfo = useRef(["20%", "0"]);

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
        return <AboutPage />;
      case "Pricing":
        return <PricingPage />;
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
  }

  return (
    <>
      <header>
        <button className="logo" onClick={goHome}>
          <img src="/favicon.png" alt="Logo" />
          <h1>| Leffler WebDev</h1>
        </button>
        <nav>
          <a className="navLink" onClick={() => setCurrentPage("Home")}>
            Home
          </a>
          <a className="navLink" onClick={() => setCurrentPage("About")}>
            About
          </a>
          <a className="navLink" onClick={() => setCurrentPage("Pricing")}>
            Pricing
          </a>
          <a className="navLink" onClick={() => setCurrentPage("Contact")}>
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
