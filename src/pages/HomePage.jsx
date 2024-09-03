import { useEffect, useRef } from "react";
import "animate.css";
import anime from "animejs";
import PropTypes from "prop-types";

const HomePage = ({ info }) => {
  const setCurrentPage = info[3];

  // When the page loads, animate the text
  useEffect(() => {
    window.scrollTo(0, 0);

    // Add previous styles to animated elements
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
  }, [info]);

  window.onscroll = () => {
    const cards = document.querySelectorAll(".card");
    if (cards) {
      if (window.scrollY > 1715 && !info[7].current) {
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
  const t = 15000;
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
      }, t);
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
    }, t);
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
    }, t);
  };

  return (
    <div className="home-grid-container">
      <main className="homeAboutMain">
        <article className="homeTitle">
          <div className="div">
            <h1>Leffler WebDev</h1>
            <p>Designing & Developing For You</p>
          </div>
          <div className="info">
            <p>
              We are a national organization specializing in website design and
              development, dedicated to delivering exceptional digital
              solutions. With years of experience, we deeply understand the
              importance of a successful online presence. Our team excels at
              crafting websites that not only captivate and engage audiences but
              also drive meaningful impact in today&apos;s digital landscape. We
              believe in empowering our clients to make a difference, and we&apos;re
              here to ensure your website becomes a powerful tool for your
              success.
            </p>
            <button
              className="aboutLearnBtn"
              onClick={() => setCurrentPage("About")}
            >
              <p id="text">Learn More</p>
            </button>
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
                <img
                  src="/src/assets/descImgs/phone-tablet.png"
                  alt="Image of website on multiple devices"
                  className="image1"
                />
                <img
                  src="/src/assets/descImgs/phone-tablet.png"
                  alt="Image of website on multiple devices that is semi-transparent"
                  className="image2"
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
                  that everyone can have a good experience.
                </p>
              </article>
              <div className="images">
                <img
                  src="/src/assets/descImgs/html.png"
                  alt="Image of HTML code"
                  className="image1"
                />
                <img
                  src="/src/assets/descImgs/html.png"
                  alt="Image of HTML code that is semi-transparent"
                  className="image2"
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
                  doesn&apos;t look as good as it can be, your users won&apos;t want to
                  stay on your site. We make sure that your website is the best
                  it can be so that you can have the best experience possible.
                </p>
              </article>
              <div className="images">
                <img
                  src="/src/assets/descImgs/web-template.png"
                  alt="Image of website design template"
                  className="image1"
                />
                <img
                  src="/src/assets/descImgs/web-template.png"
                  alt="Image of website design template that is semi-transparent"
                  className="image2"
                />
              </div>
            </div>
          </div>
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
            The time it will take heavily depends on the website you&apos;re looking
            for. A typical website will take around <u>2-4 weeks</u> to be fully
            completed and optimized.
          </p>
        </div>
      </div>
    </div>
  );
};

HomePage.propTypes = {
  info: PropTypes.arrayOf(
    PropTypes.shape({
      current: PropTypes.any.isRequired,
    })
  ).isRequired,
};

export default HomePage;
