import React, { useEffect, useState } from "react";
const HomePage = ({
  textAniActive,
  homeAsideInfoAniActive,
  setCurrentPage,
  asideStyleInfo,
  cardStyleInfo,
  cardsAniActive,
}) => {
  // When the page loads, animate the text
  useEffect(() => {
    if (!textAniActive.current) {
      const h1Element = document.querySelector("#mainTextCont h1");
      const pElement = document.querySelector("#mainTextCont p");
      h1Element.style.animation = "slideInLeft 2s ease-out forwards";
      pElement.style.animation = "slideInRight 2s ease-out forwards";
      textAniActive.current = true;
    }

    // Add previous styles to animated elements
    const asideInfo = document.querySelector(".homeAsideInfo");
    const cards = document.querySelectorAll(".card");
    asideInfo.style.left = asideStyleInfo.current[0];
    asideInfo.style.opacity = asideStyleInfo.current[1];
    cards.forEach((card) => {
      card.style.top = cardStyleInfo.current[0];
      card.style.opacity = cardStyleInfo.current[1];
    });
    return;
  }, []);

  window.onscroll = () => {
    // When scrolling, animate the aside info
    const asideInfo = document.querySelector(".homeAsideInfo");
    const cards = document.querySelectorAll(".card");
    if (
      window.scrollY > asideInfo?.offsetTop - asideInfo?.offsetTop / 2 &&
      !homeAsideInfoAniActive.current
    ) {
      asideInfo.style.animation = "widthExpand 1.2s ease-out forwards";
      asideStyleInfo.current = ["0", "1"];
      homeAsideInfoAniActive.current = true;
    }
    // When scrolling, animate the cards
    console.log(cards[0]?.offsetTop);
    console.log(window.scrollY);
    if (
      window.scrollY > cards[0]?.offsetTop * 0.8 &&
      !cardsAniActive.current
    ) {
      cards.forEach((card, index) => {
        card.style.animation = `cardSlideIn 1.2s ease-out ${
          index / 2
        }s forwards`;
        cardStyleInfo.current = ["0", "1"];
      });
      cardsAniActive.current = true;
    }
  };

  // Get the current time in EST
  const [time, setTime] = useState("");
  setInterval(() => {
    const now = new Date();
    const estTime = new Date(
      now.toLocaleString("en-US", { timeZone: "America/New_York" })
    );
    let hours = String(estTime.getHours()).padStart(2, "0");
    hours = hours % 12 || 12;
    const minutes = String(estTime.getMinutes()).padStart(2, "0");
    setTime(`${hours}:${minutes} ${estTime.getHours() >= 12 ? "PM" : "AM"}`);
  }, 1000);

  return (
    <div className="home-grid-container">
      <main className="homeMain">
        <div id="mainTextCont">
          <h1>
            <b>Developing</b> and <b>Designing</b>
          </h1>
          <p>
            Websites <u>For You</u>
          </p>
        </div>
        <div id="mainImgCont">
          <img src="/src/assets/designing.png" alt="Image of Computer" />
        </div>
      </main>
      <div className="divider"></div>
      <aside className="homeAsideInfo">
        <div id="offeringsList">
          <h1>We Offer</h1>
          <ul>
            <li>Web Design</li>
            <li>Web Development</li>
            <li>SEO Optimization</li>
            <li>Web Hosting</li>
            <li>Web Maintenance</li>
            <li>and more...</li>
          </ul>
          <p>
            Creating websites that make an impact are our specialty. We offer
            everything that a website needs to be successful, all to make it
            easy for you.
          </p>
        </div>
      </aside>
      <main className="homeMainInfo">
        <hr />
        <h1>A Little About Us</h1>
        <hr />
        <p>
          We want to make the best website for your needs. We are prepared to do
          what is necessary to make you love your new website. With friendly
          support and communication, we are ready to hear you out to understand
          what you need. With quick and efficient work, we will make sure you
          get what you want, when you want it.
        </p>
        <a onClick={() => setCurrentPage("About")}>Learn More</a>
        <hr />
      </main>
      <div className="location">
        <h1>Home Base</h1>
        <p className="text">
          Currently based in Raleigh, North Carolina, we proudly serve clients
          across the entire United States. Operating in the Eastern Time Zone
          (EST), our team is dedicated to providing exceptional support no
          matter where you are. We are committed to assisting you to the best of
          our ability, wherever you may be located.
        </p>
        <p className="time">Our Time: {time}</p>
        <div className="img"></div>
      </div>
      <div className="pricing">
        <div className="card">
          <div className="bar"></div>
        </div>
        <div className="card">
          <div className="bar"></div>
        </div>
        <div className="card">
          <div className="bar"></div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
