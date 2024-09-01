import React, { useEffect, useState } from "react";
import "animate.css";

const HomePage = ({ info }) => {
  // When the page loads, animate the text
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!info[0].current) {
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
        info[6].current = [1, "-0.625em", "0.625em", 0];
      }, 2000);
      info[0].current = true;
    }

    // Add previous styles to animated elements
    if (info[6].current.length !== 0) {
      const ml3 = document.querySelectorAll(".ml3 .line");
      const ampersand = document.querySelector(".ml3 .ampersand");
      const lettersLeft = document.querySelector(".ml3 .letters-left");
      const lettersRight = document.querySelector(".ml3 .letters-right");
      const forYou = document.querySelector("#mainTextCont p");
      ml3.forEach((line, i) => {
        line.style.opacity = info[6].current[0];
        line.style.transform = `scaleX(${info[6].current[0]}) translateY(${
          info[6].current[i + 1]
        })`;
      });
      ampersand.style.opacity = info[6].current[0];
      ampersand.style.transform = `scaleY(${info[6].current[0]})`;
      lettersLeft.style.opacity = info[6].current[0];
      lettersLeft.style.transform = `translateX(${info[6].current[3]})`;
      lettersRight.style.opacity = info[6].current[0];
      lettersRight.style.transform = `translateX(${info[6].current[3]})`;
      forYou.style.opacity = info[6].current[0];
    }
    const offeringsList = document.querySelectorAll(".offerings ul li");
    offeringsList.forEach((li) => {
      li.style.opacity = info[8].current;
    });
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.style.top = info[5].current[0];
      card.style.opacity = info[5].current[1];
    });
    return;
  }, []);

  window.onscroll = () => {
    const cards = document.querySelectorAll(".card");
    if (cards) {
      if (window.scrollY > 1365 && !info[7].current) {
        anime({
          targets: ".offerings ul li",
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 800,
          delay: (_, i) => 80 * i,
        });
        info[7].current = true;
        info[8].current = 1;
      }
      // When scrolling, animate the cards
      if (window.scrollY > 1965 && !info[2].current) {
        cards.forEach((card, index) => {
          card.style.animation = `cardSlideIn 1.2s ease-out ${
            index / 2
          }s forwards`;
          info[5].current = ["5%", "1"];
        });
        info[2].current = true;
      }
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
      <main className="homeAboutMain">
        <article className="servicesCampaign">
          <div>
            <img src="webIcon.svg" alt="Web Icon" />
          </div>
          <div>
            <h1>Find Exactly What You Need Today</h1>
            <p className="p">
              With our expertise, we can get you the website that you need.
              Utilize our services so you can reach your full potential. <br />
              Check out everything we offer and learn more about us.
            </p>
            <button onClick={() => setCurrentPage("Services")}>
              <p>Our Services</p>
            </button>
          </div>
        </article>
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
            <p id="text">Learn More</p>
          </button>
        </article>
        <article className="homeBase">
          <h1>Home Base</h1>
          <p className="p">
            Located in Raleigh, North Carolina, we proudly extend our
            exceptional services across the entire United States. No matter
            where you are, our expertise is just a call or click away. Operating
            on Eastern Time (EST), our team is available throughout the business
            week, ready to partner with you and deliver top-notch services that
            exceed expectations. Your success is our priority, and we're always
            here to assist, regardless of your location or time zone.
          </p>
          <h3 className="time">
            Our Time: <time className="timeNum">{time}</time>
          </h3>
        </article>
        <article className="offerings">
          <div className="left"></div>
          <div className="right">
            <ul>
              <h1>What We Offer You</h1>
              <li>Website Development</li>
              <li>Website Design</li>
              <li>Website Hosting</li>
              <li>Website SEO</li>
              <li>Website Maintenance</li>
              <li>And more...</li>
            </ul>
          </div>
        </article>
        <article className="callNow">
          <h1>Call or Text Now!</h1>
          <h1 id="phone">
            <a href="tel:+12528763653">(252)-876-3653</a>
          </h1>
          <p>For more information about your website</p>
        </article>
      </main>
      <div className="pricing">
        <h1 id="faqTitle">FAQs</h1>
        <div className="card">
          <h1 className="faqHeader">Why Do I Need a Website?</h1>
          <p>
            Having a website to represent you or your business can help direct
            people to see what you do. Not only that but it also makes you fully
            accessible to the <u>world.</u>
          </p>
        </div>
        <div className="card">
          <h1 className="faqHeader">How Much Will It Cost?</h1>
          <p>
            The cost of the website is also very dependent on the result you
            want. A base website will usually cost <u>$229.99.</u>
          </p>
        </div>
        <div className="card">
          <h1 className="faqHeader">How Long Will It Take?</h1>
          <p>
            The time it will take heavily depends on the website you're looking
            for. A typical website will take around <u>2-4 weeks</u> to be fully
            completed and optimized.
          </p>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
