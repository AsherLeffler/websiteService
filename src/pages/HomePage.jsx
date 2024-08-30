import React, { useEffect, useState } from "react";
import "animate.css";

const HomePage = ({
  textAniActive,
  homeAsideInfoAniActive,
  setCurrentPage,
  asideStyleInfo,
  cardStyleInfo,
  cardsAniActive,
  titleStyling,
}) => {
  // When the page loads, animate the text
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!textAniActive.current) {
      anime
        .timeline({ loop: false })
        .add({
          targets: ".ml3 .line",
          opacity: [0.5, 1],
          scaleX: [0, 1],
          easing: "easeInOutExpo",
          duration: 700,
        })
        .add({
          targets: ".ml3 .line",
          duration: 600,
          easing: "easeOutExpo",
          translateY: (_, i) => -0.625 + 0.625 * 2 * i + "em",
        })
        .add({
          targets: ".ml3 .ampersand",
          opacity: [0, 1],
          scaleY: [0.5, 1],
          easing: "easeOutExpo",
          duration: 600,
          offset: "-=600",
        })
        .add({
          targets: ".ml3 .letters-left",
          opacity: [0, 1],
          translateX: ["0.5em", 0],
          easing: "easeOutExpo",
          duration: 600,
          offset: "-=300",
        })
        .add({
          targets: ".ml3 .letters-right",
          opacity: [0, 1],
          translateX: ["-0.5em", 0],
          easing: "easeOutExpo",
          duration: 600,
          offset: "-=600",
        });
      const pElement = document.querySelector("#mainTextCont p");
      pElement.style.animation = "fadeIn 1.2s ease-out forwards";
      pElement.style.animationDelay = "1.3s";
      setTimeout(() => {
        titleStyling.current = [1, "-0.625em", "0.625em", 0];
      }, 2000);
      textAniActive.current = true;
    }

    // Add previous styles to animated elements
    if (titleStyling.current.length !== 0) {
      const ml3 = document.querySelectorAll(".ml3 .line");
      const ampersand = document.querySelector(".ml3 .ampersand");
      const lettersLeft = document.querySelector(".ml3 .letters-left");
      const lettersRight = document.querySelector(".ml3 .letters-right");
      const forYou = document.querySelector("#mainTextCont p");
      ml3.forEach((line, i) => {
        line.style.opacity = titleStyling.current[0];
        line.style.transform = `scaleX(${titleStyling.current[0]}) translateY(${
          titleStyling.current[i + 1]
        })`;
      });
      ampersand.style.opacity = titleStyling.current[0];
      ampersand.style.transform = `scaleY(${titleStyling.current[0]})`;
      lettersLeft.style.opacity = titleStyling.current[0];
      lettersLeft.style.transform = `translateX(${titleStyling.current[3]})`;
      lettersRight.style.opacity = titleStyling.current[0];
      lettersRight.style.transform = `translateX(${titleStyling.current[3]})`;
      forYou.style.opacity = titleStyling.current[0];
    }
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.style.top = cardStyleInfo.current[0];
      card.style.opacity = cardStyleInfo.current[1];
    });
    return;
  }, []);

  window.onscroll = () => {
    // When scrolling, animate the aside info
    const cards = document.querySelectorAll(".card");
    if (window.scrollY > 156 && !homeAsideInfoAniActive.current) {
    }
    // When scrolling, animate the cards
    if (window.scrollY > 1110 && !cardsAniActive.current) {
      cards.forEach((card, index) => {
        card.style.animation = `cardSlideIn 1.2s ease-out ${
          index / 2
        }s forwards`;
        cardStyleInfo.current = ["5%", "1"];
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
          <h1 className="ml3">
            <span className="text-wrapper">
              <span className="line line1"></span>
              <b>
                <span className="letters letters-left">Developing</span>
              </b>{" "}
              <span className="letters ampersand">&amp;</span>{" "}
              <b>
                <span className="letters letters-right">Designing</span>
              </b>
              <span className="line line2"></span>
            </span>
          </h1>
          <p>
            Websites <u>For You</u>
          </p>
        </div>
      </main>
      <div className="divider"></div>
      <main className="homeAboutMain">
        <article className="mainAbout">
          <h1>About Us</h1>
          <p>
            We are a national organization specializing in website design and
            development, dedicated to delivering exceptional digital solutions.
            With years of experience, we deeply understand the importance of a
            successful online presence. Our team excels at crafting websites
            that not only captivate and engage audiences but also drive
            meaningful impact in today's digital landscape. We believe in
            empowering our clients to make a difference, and we're here to
            ensure your website becomes a powerful tool for your success.
          </p>
          <button
            className="aboutLearnBtn"
            onClick={() => setCurrentPage("About")}
          >
            Learn More
          </button>
        </article>
        <article>
          <h1>What we Offer You</h1>
          <ul>
            <li>Website Development</li>
            <li>Website Design</li>
            <li>Website Hosting</li>
            <li>Website SEO</li>
            <li>Website Maintenance</li>
            <li>And more...</li>
          </ul>
        </article>
        <article>
          <h1>Home Base</h1>
          <p>
            Located in Raleigh, North Carolina, we proudly extend our services
            beyond state lines, reaching clients across the entire United
            States. Our team operates on Eastern Time (EST) and is available
            throughout the business week, ensuring we're here to support your
            needs no matter where you're located.
          </p>
          <p>Our Time: {time}</p>
        </article>
      </main>
      <div className="pricing">
        <h1 id="faqTitle">FAQs</h1>
        <div className="card">
          <div className="bar">
            <hr />
          </div>
          <h1 className="faqHeader">Why Do I Need a Website?</h1>
          <p>
            Having a website to represent you or your business can help direct
            people to see what you do. Not only that but it also makes you fully
            accessible to the <u>world.</u>
          </p>
        </div>
        <div className="card">
          <div className="bar">
            <hr />
          </div>
          <h1 className="faqHeader">How Long Will It Take?</h1>
          <p>
            The time it will take heavily depends on the website you're looking
            for. A typical website will take around <u>2-4 weeks</u> to be fully
            completed and optimized.
          </p>
        </div>
        <div className="card">
          <div className="bar">
            <hr />
          </div>
          <h1 className="faqHeader">How Much Will It Cost?</h1>
          <p>
            The cost of the website also heavily revolves around the result you
            want. Including creation, optimization, and hosting, the average
            website will cost around <u>$229.99.</u>
          </p>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
