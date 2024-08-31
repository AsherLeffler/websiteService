import { useState, useEffect } from "react";
import "./services.css";

const ServicesPage = ({ learning, setLearning, setCurrentPage }) => {
  // When the page loads animate the first cardCont
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [canFlip, setCanFlip] = useState(false);

  useEffect(() => {
    setTriggerEffect(true);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const cardConts = document.querySelectorAll(".cardCont");
    if (cardConts.length > 0)
      cardConts[0].style.animation = "cardsRise 1.2s ease-out forwards";
    if (learning !== "default") {
      var textWrapper = document.querySelectorAll(".ml2");
      textWrapper.forEach((wrapper, i) => {
        wrapper.innerHTML = wrapper.textContent
          .split(" ")
          .map((word) => {
            return `<span class='word'>${word
              .split("")
              .map(
                (letter) =>
                  `<span class='${
                    i === 0 ? "letter0" : "letter1"
                  }'>${letter}</span>`
              )
              .join("")}</span>`;
          })
          .join(" ");
      });
      anime
        .timeline({ loop: false })
        .add({
          targets: ".ml2 .letter0",
          scale: [4, 1],
          opacity: [0, 1],
          translateZ: 0,
          easing: "easeOutExpo",
          duration: 950,
          delay: (_, i) => 30 * i,
        })
        .add({
          targets: ".ml2 .letter1",
          opacity: [0, 1],
          translateZ: 0,
          easing: "easeOutExpo",
          duration: 1400,
          delay: (_, i) => 0 * i,
        })
        .add({
          targets: ".learnMoreCont .ul",
          opacity: [0, 1],
          duration: 1200,
          easing: "easeOutExpo",
          delay: 100,
        });

      // Service Options Text Animation
      if (learning === "maintenance" || learning === "hosting") {
        setCanFlip(false);
        var textWrappers = document.querySelectorAll(".ml1 .letters");
        textWrappers.forEach((textWrapper) => {
          textWrapper.innerHTML = textWrapper.textContent
            .split(" ")
            .map((word) => {
              return `<span class='word'>${word
                .split("")
                .map((letter) => `<span class='letter'>${letter}</span>`)
                .join("")}</span>`;
            })
            .join(" ");
        });
        setTimeout(() => {
          anime
            .timeline({ loop: false })
            .add({
              targets: ".ml1 .letter",
              scale: [0.3, 1],
              opacity: [0, 1],
              translateZ: 0,
              easing: "easeOutExpo",
              duration: 600,
              delay: (_, i) => 80 * (i + 1),
            })
            .add({
              targets: ".ml1 .line",
              scaleX: [0, 1],
              opacity: [0.5, 1],
              easing: "easeOutExpo",
              duration: 700,
              offset: "-=875",
              delay: (_, i, l) => 80 * (l - i),
            })
            .add({
              targets: ".backOf p",
              opacity: [0, 1],
              easing: "easeOutExpo",
              duration: 700,
            });
          setTimeout(() => {
            setCanFlip(true);
          }, 2200);
        }, 5000);
      } else if (learning === "custom") {
        setTimeout(() => {
          anime
            .timeline({ loop: false })
            .add({
              targets: ".listTitle",
              opacity: [0, 1],
              easing: "easeOutExpo",
              duration: 1100,
            })
            .add({
              targets: ".list",
              opacity: [0, 1],
              easing: "easeOutExpo",
              duration: 1100,
              delay: (_, i) => 110 * i,
            });
        }, 5000);
      }
      const content = document.querySelectorAll(".ml2 .word");
      if (content[42]) {
        const letterSpans = content[42].querySelectorAll(".letter1");
        const wordFromLetters = Array.from(letterSpans)
          .map((span) => span.textContent)
          .join("");
        if ("contact" === wordFromLetters) {
          setTimeout(() => {
            const anchorTag = document.createElement("a");
            anchorTag.textContent = "contact";
            anchorTag.addEventListener("click", () =>
              setCurrentPage("Contact")
            );
            content[42].insertAdjacentElement("afterend", anchorTag);
            content[42].innerHTML = "";
          }, 4000);
        }
      }
    }
    setTriggerEffect(false);
    return;
  }, [triggerEffect, learning]);

  // When scrolling past the first cardCont, animate the second cardCont
  window.onscroll = () => {
    const cardConts = document.querySelectorAll(".cardCont");
    if (window.scrollY > 200 && !cardConts[1].style.animation) {
      cardConts[1].style.animation = "cardsRise 1.2s ease-out forwards";
    }
    if (window.scrollY > 580 && !cardConts[2].style.animation) {
      cardConts[2].style.animation = "cardsRise 1.2s ease-out forwards";
    }
    if (window.scrollY > 880 && !cardConts[3].style.animation) {
      cardConts[3].style.animation = "cardsRise 1.2s ease-out forwards";
    }
  };

  return (
    <>
      {learning === "default" && (
        <div className="services-grid-container">
          <main className="servicesMain">
            <h1 className="h1">What We Can do For You</h1>
            <div className="cardCont">
              <div className="serviceCard" onClick={() => setLearning("desDev")}>
                <h1>Web Design + Development</h1>
                <p>
                  We create the entire website based on your end goal. We make
                  the design and develop the website entirely.
                </p>
              </div>
              <div className="serviceCard" onClick={() => setLearning("redesign")}>
                <h1>Web Redesign</h1>
                <p>
                  We take a website you currently have, and we redesign it to
                  your needs. New fresh design, same website.
                </p>
              </div>
              <div className="serviceCard" onClick={() => setLearning("devDes")}>
                <h1>Web Development From Design</h1>
                <p>
                  We develop your website based on the design of your choice. We
                  make it just how you invisioned it.
                </p>
              </div>
            </div>
            <div className="cardCont">
              <div className="serviceCard" onClick={() => setLearning("SEO")}>
                <h1>SEO Optimzization</h1>
                <p>
                  We optimize your website so it can more easily be found by
                  search engines. This leads to more exposure to the world.
                </p>
              </div>
              <div className="serviceCard" onClick={() => setLearning("hosting")}>
                <h1>Web Hosting</h1>
                <p>
                  We host your website for you. Any website of your choice,
                  hosted by us so you don't have to.
                </p>
              </div>
              <div className="serviceCard" onClick={() => setLearning("maintenance")}>
                <h1>Web Maintenance</h1>
                <p>
                  We maintain your current website to make sure it is up to date
                  for the world to see.
                </p>
              </div>
            </div>
            <div className="cardCont" id="else">
              <h1 className="h1" style={{ textShadow: "0 0 12px white" }}>
                ✨Recommended✨
              </h1>
              <div className="customCard" onClick={() => setLearning("package")}>
                <h1>The Website Package</h1>
                <p>
                  A package deal for all of the services you will need for a
                  successful website. The key essentials your brand new website.
                </p>
              </div>
            </div>
            <div className="cardCont">
              <div className="customCard" onClick={() => setLearning("custom")}>
                <h1>Custom Service</h1>
                <p>
                  Any combination of the services we offer. Whatever services
                  you need, we can do it special just for you.
                </p>
              </div>
            </div>
          </main>
        </div>
      )}
      {learning === "package" && (
        <main className="learnMoreCont">
          <a className="back" onClick={() => setLearning("default")}>
            <i className="fa-solid fa-angles-left"></i> Other Services
          </a>
          <h1 className="moreH1 ml2">The Website Package</h1>
          <p className="ml2">
            A package deal for all of the services you will need for a
            successful website. With all of the things you need in your website,
            it is guaranteed to make an impact on the world. Taken care of fully
            by us, you don't have to lift a finger to become the proud owner of
            an amazing site.
          </p>
          <ul className="ul">
            <h1>What you get:</h1>
            <li>A unique website design</li>
            <li>A fully functional and responsive site</li>
            <li>Showcase your chosen content</li>
            <li>SEO optimization</li>
            <li>Website Hosting for 3 months</li>
            <li>Website Maintenance for 3 months</li>
            <li>Support when you need it</li>
          </ul>
        </main>
      )}
      {learning === "custom" && (
        <main className="learnMoreCont">
          <a className="back" onClick={() => setLearning("default")}>
            <i className="fa-solid fa-angles-left"></i> Other Services
          </a>
          <h1 className="moreH1 ml2">
            Any Combination of Services For a Custom Price
          </h1>
          <p className="ml2">
            Pick any combination of services, no matter how many. We will take
            care of it for you. We will manufacture your ideal website with all
            of the services you need. When filling out our contact form, choose
            the services you are looking to inquire about.
          </p>
          <div className="serviceCardList">
            <h1 className="listTitle">All of Our Services:</h1>
            <div className="list">
              <h1>Web Design + Development</h1>
              <hr />
              <a onClick={() => setLearning("desDev")}>More Information</a>
            </div>
            <div className="list">
              <h1>Web Redesign</h1>
              <hr />
              <a onClick={() => setLearning("redesign")}>More Information</a>
            </div>
            <div className="list">
              <h1>Web Development From Design</h1>
              <hr />
              <a onClick={() => setLearning("devDes")}>More Information</a>
            </div>
            <div className="list">
              <h1>SEO Optimization</h1>
              <hr />
              <a onClick={() => setLearning("SEO")}>More Information</a>
            </div>
            <div className="list">
              <h1>Web Hosting</h1>
              <hr />
              <a onClick={() => setLearning("hosting")}>More Information</a>
            </div>
            <div className="list">
              <h1>Web Maintenance</h1>
              <hr />
              <a onClick={() => setLearning("maintenance")}>More Information</a>
            </div>
          </div>
        </main>
      )}
      {learning === "desDev" && (
        <main className="learnMoreCont">
          <a className="back" onClick={() => setLearning("default")}>
            <i className="fa-solid fa-angles-left"></i> Other Services
          </a>
          <h1 className="moreH1 ml2">
            Designing and Developing Your Perfect Website
          </h1>
          <p className="ml2">
            We create the design and the site itself. You don't need to do
            anything, we take care of it. We make it with the content of your
            choice to communicate your message in an appealing and user-friendly
            way. Based on your information and needs, we personally currate a
            website that is perfect for you.
          </p>
          <ul className="ul">
            <h1>What you get:</h1>
            <li>A unique website design</li>
            <li>A fully functional and responsive site</li>
            <li>Showcase your chosen content</li>
            <li>Support when you need it</li>
          </ul>
        </main>
      )}
      {learning === "redesign" && (
        <main className="learnMoreCont">
          <a className="back" onClick={() => setLearning("default")}>
            <i className="fa-solid fa-angles-left"></i> Other Services
          </a>
          <h1 className="moreH1 ml2">We Redesign Your Website to Your Needs</h1>
          <p className="ml2">
            We create a new design for your website, but keep the same content.
            Your website gets a new fresh look that is also responsive and
            user-friendly. You tell us what you want your website to look like
            and we currate a design for you. We also fully implement the new
            design in for you so you don't have to.
          </p>
          <ul className="ul">
            <h1>What you get:</h1>
            <li>A new unique website design</li>
            <li>Responsive and user-friendly content</li>
            <li>Full implementation</li>
            <li>Support when you need it</li>
          </ul>
        </main>
      )}
      {learning === "devDes" && (
        <main className="learnMoreCont">
          <a className="back" onClick={() => setLearning("default")}>
            <i className="fa-solid fa-angles-left"></i> Other Services
          </a>
          <h1 className="moreH1 ml2">You have a design, we bring it to life</h1>
          <p className="ml2">
            If you have a design that you want to be made into a website, we can
            do it. We take your design and develop it into a fully functional
            website. Almost any design we can turn it reality for you. We build
            the website based on your design, and make sure it looks good to all
            eyes, on all devices.
          </p>
          <ul className="ul">
            <h1>What you get:</h1>
            <li>A full website based on your design</li>
            <li>Responsive and user-friendly content</li>
            <li>Support when you need it</li>
          </ul>
        </main>
      )}
      {learning === "SEO" && (
        <main className="learnMoreCont">
          <a className="back" onClick={() => setLearning("default")}>
            <i className="fa-solid fa-angles-left"></i> Other Services
          </a>
          <h1 className="moreH1 ml2">SEO Optimization for your website</h1>
          <p className="ml2">
            We optimize your website so it can be found more easily by search
            engines. It directs more online traffic to your site so your website
            reaches more people. By finding key content in your website, we can
            make it easier for google to find your content and show it to the
            world. We help expand your online presence.
          </p>
          <ul className="ul">
            <h1>What you get:</h1>
            <li>An SEO optimized website</li>
            <li>Search-Engine friendly content</li>
            <li>Advanced google title</li>
          </ul>
        </main>
      )}
      {learning === "hosting" && (
        <main className="learnMoreCont">
          <a className="back" onClick={() => setLearning("default")}>
            <i className="fa-solid fa-angles-left"></i> Other Services
          </a>
          <h1 className="moreH1 ml2">Hosting Made Easy For You</h1>
          <p className="ml2">
            We host your website for you. Any website of your choice, hosted and
            taken care of by us. We make sure you website reaches the world
            through the internet. When you send us your website, we will take it
            and put it so that you can find it from google. You choose the
            domain we take care of the rest.
          </p>
          <ul className="ul">
            <h1>What you get:</h1>
            <li>A secure online host</li>
            <li>Internet accessibilty</li>
            <li>Easy hosting on your chosen domain</li>
            <li>Support when you need it</li>
          </ul>
          <div className="managementCard">
            <h1>Options</h1>
            <div className="optionsCont">
              <div
                className="blocker"
                style={{ display: `${canFlip ? "none" : "block"}` }}
              ></div>
              <div className="option">
                <div className="front">
                  <h3 className="ml1">
                    <span className="text-wrapper">
                      <span className="line line1"></span>
                      <span className="letters">1 Month</span>
                      <span className="line line2"></span>
                    </span>
                  </h3>
                </div>
                <div className="backOf">
                  <p>
                    For 30 days, we take care of the hosting for your website
                    and keep it on the web.
                  </p>
                </div>
              </div>
              <div className="option">
                <div className="front">
                  <h3 className="ml1">
                    <span className="text-wrapper">
                      <span className="line line1"></span>
                      <span className="letters">3 Months</span>
                      <span className="line line2"></span>
                    </span>
                  </h3>
                </div>
                <div className="backOf">
                  <p>
                    Over the course of 90 days, we will securely host your
                    website so it is accessible to the world.
                  </p>
                </div>
              </div>
              <div className="option">
                <div className="front">
                  <h3 className="ml1">
                    <span className="text-wrapper">
                      <span className="line line1"></span>
                      <span className="letters">5 Months</span>
                      <span className="line line2"></span>
                    </span>
                  </h3>
                </div>
                <div className="backOf">
                  <p>
                    With five months of hosting, your website hosting will be
                    fully taken care of for all of the time you need.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
      {learning === "maintenance" && (
        <main className="learnMoreCont">
          <a className="back" onClick={() => setLearning("default")}>
            <i className="fa-solid fa-angles-left"></i> Other Services
          </a>
          <h1 className="moreH1 ml2">
            We Maintain Your Website and Keep it Up to Date
          </h1>
          <p className="ml2">
            With constantly changing technology and information, we make sure
            your website is up to date with the world. Any changes you need, we
            take care of it for you. We take care of the hard work and make sure
            your chosen website stays exactly how you like it. We help you keep
            your website functional and running.
          </p>
          <ul className="ul">
            <h1>What you get:</h1>
            <li>Up to date information of your choice</li>
            <li>Online maintenance</li>
            <li>Website support</li>
          </ul>
          <div className="managementCard">
            <h1>Options</h1>
            <div className="optionsCont">
              <div
                className="blocker"
                style={{ display: `${canFlip ? "none" : "block"}` }}
              ></div>
              <div className="option">
                <div className="front">
                  <h3 className="ml1">
                    <span className="text-wrapper">
                      <span className="line line1"></span>
                      <span className="letters">1 Month</span>
                      <span className="line line2"></span>
                    </span>
                  </h3>
                </div>
                <div className="backOf">
                  <p>
                    We help you with continious regulation and management of
                    your website for 30 full days.
                  </p>
                </div>
              </div>
              <div className="option">
                <div className="front">
                  <h3 className="ml1">
                    <span className="text-wrapper">
                      <span className="line line1"></span>
                      <span className="letters">3 Months</span>
                      <span className="line line2"></span>
                    </span>
                  </h3>
                </div>
                <div className="backOf">
                  <p>
                    For 90 days, we make sure your website is fully functional
                    and keep it up to date.
                  </p>
                </div>
              </div>
              <div className="option">
                <div className="front">
                  <h3 className="ml1">
                    <span className="text-wrapper">
                      <span className="line line1"></span>
                      <span className="letters">5 Months</span>
                      <span className="line line2"></span>
                    </span>
                  </h3>
                </div>
                <div className="backOf">
                  <p>
                    With five months of maintence, you can keep your website up
                    to your standards without having to do a single thing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default ServicesPage;
