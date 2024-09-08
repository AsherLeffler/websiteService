import { useEffect, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import "animate.css";
import anime from "animejs";
import PropTypes from "prop-types";

// Import images
import html from "/imgs/html.webp";
import phoneTablet from "/imgs/phone-tablet.webp";
import webTemplate from "/imgs/web-template.webp";

const HomePage = ({ info }) => {
  const setCurrentPage = info[3];

  // When the page loads, animate the text
  useEffect(() => {
    window.scrollTo(0, 0);

    // Add previous styles to animated elements
    const offeringsList = document.querySelectorAll(".offerings ul li");
    offeringsList.forEach((li) => {
      li.style.opacity = info[8].current;
      li.style.transform = "translateY(0px)";
    });
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.style.top = info[5].current[0];
      card.style.opacity = info[5].current[1];
    });
    return;
  }, [info]);

  window.onscroll = () => {
    const cards = document.querySelectorAll(".card");
    const distanceFromList = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth > 769) {
        return 1440;
      } else if (windowWidth <= 769 && windowWidth > 426) {
        return 2400;
      } else if (windowWidth <= 426) {
        return 2200;
      }
    };
    if (cards) {
      if (window.scrollY > distanceFromList() && !info[7].current) {
        anime({
          targets: ".offerings ul li",
          opacity: [0, 1],
          translateY: [20, 0],
          easing: "easeOutQuad",
          duration: 800,
          delay: (_, i) => 80 * i,
        });
        info[7].current = true;
        info[8].current = 1;
      }
      // When scrolling, animate the cards
      if (window.scrollY > 1835 && !info[2].current) {
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

  function formSubmit(event) {
    event.preventDefault();
    const form = document.getElementById("askAbout");
    const formData = new FormData(form);
    fetch("https://formspree.io/f/mblrbjnp", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Thank you, we will respond shortly!");
          form.reset();
        } else {
          alert("There was a problem with the form submission.");
        }
      })
      .catch(() => {
        alert("There was a problem with the form submission.");
      });
  }

  const handleTextChange = () => {
    const phone = document.getElementById("phoneInput");
    const phoneRegEx = /^\d{10}$/;
    if (!phone.value.match(phoneRegEx)) {
      phone.value = phone.value.replace(/[^0-9]/g, "");
    } else if (phone.value.match(phoneRegEx)) {
      phone.value = `(${phone.value.slice(0, 3)})-${phone.value.slice(
        3,
        6
      )}-${phone.value.slice(6)}`;
    } else if (phone.value === "") {
      phone.value = phone.value.replace(/[^0-9]/g, "");
    }
  };

  const slideIntervalID = useRef(null);
  const slideIndex = useRef(2);

  // Interval time in seconds before switching slides
  const t = 20;

  useEffect(() => {
    if (!slideIntervalID.current) {
      const slides = document.querySelectorAll(".description");
      slides[slideIndex.current - 1].classList.add("visible");
      slides[slideIndex.current - 1].style.transform = "translateX(80px)";
      slides[slideIndex.current - 1].style.opacity = "0";
      anime({
        targets: slides[slideIndex.current - 1],
        opacity: [0, 1],
        translateX: [80, 0],
        duration: 1000,
        easing: "easeInOutQuad",
      });
      slideIntervalID.current = setInterval(() => {
        slides.forEach((slide) => slide.classList.remove("visible"));
        slideIndex.current++;
        if (slideIndex.current > slides.length) {
          slideIndex.current = 1;
        }
        slides[slideIndex.current - 1].classList.add("visible");
        slides[slideIndex.current - 1].style.transform = "translateX(80px)";
        slides[slideIndex.current - 1].style.opacity = "0";
        anime({
          targets: slides[slideIndex.current - 1],
          opacity: [0, 1],
          translateX: [80, 0],
          duration: 1000,
          easing: "easeInOutQuad",
        });
      }, t * 1000);
    }
  }, []);

  const moveSlideLeft = () => {
    clearInterval(slideIntervalID.current);
    slideIntervalID.current = null;
    const slides = document.querySelectorAll(".description");
    slides.forEach((slide) => slide.classList.remove("visible"));
    slideIndex.current--;
    if (slideIndex.current < 1) {
      slideIndex.current = slides.length;
    }
    slides[slideIndex.current - 1].classList.add("visible");
    slides[slideIndex.current - 1].style.transform = "translateX(80px)";
    slides[slideIndex.current - 1].style.opacity = "0";
    anime({
      targets: slides[slideIndex.current - 1],
      opacity: [0, 1],
      translateX: [-80, 0],
      duration: 1000,
      easing: "easeInOutQuad",
    });
    slideIntervalID.current = setInterval(() => {
      slides.forEach((slide) => slide.classList.remove("visible"));
      slideIndex.current++;
      if (slideIndex.current > slides.length) {
        slideIndex.current = 1;
      }
      slides[slideIndex.current - 1].classList.add("visible");
      slides[slideIndex.current - 1].style.transform = "translateX(80px)";
      slides[slideIndex.current - 1].style.opacity = "0";
      anime({
        targets: slides[slideIndex.current - 1],
        opacity: [0, 1],
        translateX: [80, 0],
        duration: 1000,
        easing: "easeInOutQuad",
      });
    }, t * 1000);
  };

  const moveSlideRight = () => {
    clearInterval(slideIntervalID.current);
    slideIntervalID.current = null;
    const slides = document.querySelectorAll(".description");
    slides.forEach((slide) => slide.classList.remove("visible"));
    slideIndex.current++;
    if (slideIndex.current > slides.length) {
      slideIndex.current = 1;
    }
    slides[slideIndex.current - 1].classList.add("visible");
    slides[slideIndex.current - 1].style.transform = "translateX(80px)";
    slides[slideIndex.current - 1].style.opacity = "0";
    anime({
      targets: slides[slideIndex.current - 1],
      opacity: [0, 1],
      translateX: [80, 0],
      duration: 1000,
      easing: "easeInOutQuad",
    });
    slideIntervalID.current = setInterval(() => {
      slides.forEach((slide) => slide.classList.remove("visible"));
      slideIndex.current++;
      if (slideIndex.current > slides.length) {
        slideIndex.current = 1;
      }
      slides[slideIndex.current - 1].classList.add("visible");
      slides[slideIndex.current - 1].style.transform = "translateX(80px)";
      slides[slideIndex.current - 1].style.opacity = "0";
      anime({
        targets: slides[slideIndex.current - 1],
        opacity: [0, 1],
        translateX: [80, 0],
        duration: 1000,
        easing: "easeInOutQuad",
      });
    }, t * 1000);
  };

  return (
    <div className="home-grid-container">
      <main className="homeAboutMain">
        <article className="homeTitle">
          <div className="div">
            <h1>Leffler WebDev</h1>
            <p>
              Designing & Developing <br id="phoneBreak" /> For You
            </p>
          </div>
          <div className="info">
            <p>
              We specialize in website design and development. We provide quick
              and easy website services that meet your needs. With our
              experience, we deeply understand the importance of a successful
              online presence. We excel at crafting websites that not only keep
              your audiences engaged but also drive meaningful impact in
              today&apos;s digital landscape. We give you the ability to make a
              difference, and we&apos;re here to ensure your website becomes a
              powerful tool for your success.
            </p>
            <Link to="/about" className=".link">
              <button
                className="aboutLearnBtn"
                onClick={() => setCurrentPage("About")}
              >
                <p id="text">Learn More About Us</p>
              </button>
            </Link>
          </div>
          <div className="main-card">
            <form method="POST" onSubmit={formSubmit} id="askAbout">
              <h1>Ask Us About Your Website Today</h1>
              <input
                type="text"
                placeholder="Full Name*"
                name="Full Name"
                required
              />
              <input type="email" placeholder="Email*" name="Email" required />
              <input
                type="tel"
                placeholder="Phone*"
                name="Phone#"
                onChange={handleTextChange}
                id="phoneInput"
                required
              />
              <textarea
                name="Message"
                id="message"
                cols="30"
                rows="10"
                placeholder="Message*"
                required
              ></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
        </article>
        <article className="servicesCampaign">
          <div>
            <img src="webIcon.svg" alt="Web Icon" />
          </div>
          <div>
            <div className="div">
              <img src="webIcon.svg" alt="Web Icon" />
            </div>
            <h1>Find Exactly What You Need Today</h1>
            <p className="p">
              With our expertise, we can get you the website that you need.
              Utilize our services so you can reach your full potential. Check
              out everything we offer and learn more about us.
            </p>
            <button onClick={() => setCurrentPage("Services")}>
              <p>Our Services</p>
            </button>
          </div>
        </article>
        <article className="what-we-do">
          <h1 className="whatH1">What We Do</h1>
          <div className="whatCont">
            <div className="arrow1" onClick={moveSlideLeft}>
              ←
            </div>
            <div className="arrow2" onClick={moveSlideRight}>
              →
            </div>
            <div className="description">
              <article className="text">
                <h1>Responsiveness</h1>
                <p>
                  With any website, responsiveness is a very important factor.
                  Having a responsive page means your page adapts to any device
                  while still looking exceptional. We create websites that can
                  be altered to fit any screen size. This ensures that your
                  website looks great on any device. Without responsiveness,
                  your website will be hard to navigate and will not look as
                  good as it could. Not only does this hurt your website
                  experience, but it also causes your website to fall down the
                  page rankings. This is why making sure your website is
                  responsive is so crucial for it&apos;s and yours success.
                </p>
              </article>
              <div className="images">
                <LazyLoadImage
                  src={phoneTablet}
                  alt="Image of website on multiple devices"
                  id="image1"
                  effect="blur"
                />
                <LazyLoadImage
                  src={phoneTablet}
                  alt="Image of website on multiple devices that is semi-transparent"
                  id="image2"
                  effect="blur"
                />
              </div>
            </div>
            <div className="description">
              <article className="text">
                <h1>Development</h1>
                <p>
                  Every website on the internet has information stored behind it
                  that makes it show up on your screen. With our websites, we
                  specially develop that information and make sure it is
                  optimized for the best performance. This is important because
                  without an optimized website, search engines will not be able
                  to see it. This means that your website will not be seen by
                  anyone who might be looking for you or your business. We
                  create the best possible site for you and your customers so
                  that everyone will have a good experience.
                </p>
              </article>
              <div className="images" id="non-darkImgs">
                <LazyLoadImage
                  src={html}
                  alt="Image of HTML code"
                  className="image1"
                  effect="blur"
                />
                <LazyLoadImage
                  src={html}
                  alt="Image of HTML code that is semi-transparent"
                  className="image2"
                  effect="blur"
                />
              </div>
            </div>
            <div className="description">
              <article className="text">
                <h1>Design</h1>
                <p>
                  Every business has a different target market. Whether it be
                  younger people or older people, women or men, we create the
                  best design for your customers so that you can best connect
                  with the people that visit your website. We make sure that
                  your website is appealing to the eye while still having
                  functionality. We create all of our websites with a unique
                  design that looks stunning and professional. If your website
                  doesn&apos;t look as good as it can be, your users won&apos;t
                  want to stay on your site. We make sure that your website is
                  the best it can be so that you can have the best experience
                  possible.
                </p>
              </article>
              <div className="images">
                <LazyLoadImage
                  src={webTemplate}
                  alt="Image of website design template"
                  className="image1"
                  effect="blur"
                />
                <LazyLoadImage
                  src={webTemplate}
                  alt="Image of website design template that is semi-transparent"
                  className="image2"
                  effect="blur"
                />
              </div>
            </div>
          </div>
          <div className="hiddenArrows">
            <div className="hidden-arrow1" onClick={moveSlideLeft}>
              ←
            </div>
            <div className="hidden-arrow2" onClick={moveSlideRight}>
              →
            </div>
          </div>
        </article>
        <article className="offerings">
          <div className="left"></div>
          <div className="right">
            <div className="hiddenImg"></div>
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
      </main>
      <div className="pricing">
        <h1 id="faqTitle">FAQs</h1>
        <div className="card">
          <div className="div"></div>
          <h1 className="faqHeader">Why Do I Need a Website?</h1>
          <p>
            Having a website to represent you or your business can help direct
            people to see what you do. Not only that but it also makes you fully
            accessible to the <u>world.</u>
          </p>
        </div>
        <div className="card">
          <div className="div"></div>
          <h1 className="faqHeader">How Much Will It Cost?</h1>
          <p>
            The cost of the website is also very dependent on the result you
            want. A base website will usually cost <u>$229.99.</u>
          </p>
        </div>
        <div className="card">
          <div className="div"></div>
          <h1 className="faqHeader">How Long Will It Take?</h1>
          <p>
            The time it will take heavily depends on the website you&apos;re
            looking for. A typical website will take around <u>2-4 weeks</u> to
            be fully completed and optimized.
          </p>
        </div>
      </div>
    </div>
  );
};

HomePage.propTypes = {
  info: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        current: PropTypes.any.isRequired,
        set: PropTypes.func,
      }),
      PropTypes.any, // Allow other types, like numbers or strings
    ])
  ).isRequired,
};

export default HomePage;
