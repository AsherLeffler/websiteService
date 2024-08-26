import { useState, useEffect } from "react";
import "./services.css";

const ServicesPage = ({ learning, setLearning }) => {
  // When the page loads animate the first cardCont
  const [triggerEffect, setTriggerEffect] = useState(false);
  useEffect(() => {
    setTriggerEffect(true);
  }, []);

  useEffect(() => {
    const cardConts = document.querySelectorAll(".cardCont");
    if (cardConts.length > 0) 
      cardConts[0].style.animation = "cardsRise 1.2s ease-out forwards";
    
    setTriggerEffect(false);
    return;
  }, [triggerEffect, learning]);

  // When scrolling past the first cardCont, animate the second cardCont
  window.onscroll = () => {
    const cardConts = document.querySelectorAll(".cardCont");
    if (window.scrollY > 265 && !cardConts[1].style.animation) {
      cardConts[1].style.animation = "cardsRise 1.2s ease-out forwards";
    }
    if (window.scrollY > 600 && !cardConts[2].style.animation) {
      cardConts[2].style.animation = "cardsRise 1.2s ease-out forwards";
    }
  };

  return (
    <>
      {learning === "default" && (
        <div className="services-grid-container">
          <main className="servicesMain">
            <h1 className="h1">What We Can do For You</h1>
            <div className="cardCont">
              <div className="serviceCard">
                <h1>Web Design + Development</h1>
                <p>
                  We create the entire website based on your end goal. We make
                  the design and develop the website entirely.
                </p>
                <button onClick={() => setLearning("desDev")}>
                  Learn More
                </button>
              </div>
              <div className="serviceCard">
                <h1>Web Redesign</h1>
                <p>
                  We take a website you currently have, and we redesign it to
                  your needs. New fresh design, same website.
                </p>
                <button onClick={() => setLearning("redesign")}>
                  Learn More
                </button>
              </div>
              <div className="serviceCard">
                <h1>Web Development From Design</h1>
                <p>
                  We develop your website based on the design of your choice. We
                  make it just how you thought of it.
                </p>
                <button onClick={() => setLearning("devDes")}>
                  Learn More
                </button>
              </div>
            </div>
            <div className="cardCont">
              <div className="serviceCard">
                <h1>SEO Optimzization</h1>
                <p>
                  We optimize your website so it can more easily be found by
                  search engines. This leads to more exposure to the world.
                </p>
                <button onClick={() => setLearning("SEO")}>Learn More</button>
              </div>
              <div className="serviceCard">
                <h1>Web Hosting</h1>
                <p>
                  We host your website for you. Any website of your choice,
                  hosted by us so you don't have to.
                </p>
                <button onClick={() => setLearning("hosting")}>
                  Learn More
                </button>
              </div>
              <div className="serviceCard">
                <h1>Web Maintenance</h1>
                <p>
                  We maintain your current website to make sure it is up to date
                  for the world to see.
                </p>
                <button onClick={() => setLearning("maintenance")}>
                  Learn More
                </button>
              </div>
            </div>
            <div className="cardCont">
              <div className="customCard">
                <h1>Custom Service</h1>
                <p>
                  Any combination of the services we offer. Whatever services
                  you need, we can do it specified just for you.
                </p>
                <button onClick={() => setLearning("custom")}>
                  Learn More
                </button>
              </div>
            </div>
          </main>
        </div>
      )}
      {learning === "custom" && <div></div>}
      {learning === "desDev" && <div></div>}
      {learning === "redesign" && <div></div>}
      {learning === "devDes" && <div></div>}
      {learning === "SEO" && <div></div>}
      {learning === "hosting" && <div></div>}
      {learning === "maintenance" && <div></div>}
    </>
  );
};

export default ServicesPage;
