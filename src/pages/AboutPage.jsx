import React, { useEffect, useRef, useState } from "react";
import RevComponent from "./RevComponent";

const AboutPage = ({ aboutPartStyleInfo, setCurrentPage }) => {
  const [triggerEffect, setTriggerEffect] = useState(false);

  // When the page loads, animate the text
  useEffect(() => {
    setTriggerEffect(true);
  }, []);
  useEffect(() => {
    const mainText = document.querySelector(".article");
    mainText.style.animation = "rise2 1.4s ease-out forwards";
    setTriggerEffect(false);
    return;
  }, [triggerEffect]);

  // When scrolling past parts, animate them
  window.onscroll = () => {
    const aboutNumber = document.querySelector(".aboutNumber");
    if (window.scrollY > 860 && !aboutNumber.style.animation) {
      aboutNumber.style.animation = "fadeIn 1.2s ease-out forwards";
    }
    const otherTexts = document.querySelectorAll(".article1");
    if (window.scrollY > 257 && !otherTexts[0].style.animation) {
      otherTexts[0].style.animation = "rise3 1.4s ease-out forwards";
    }
    if (window.scrollY > 480 && !otherTexts[1].style.animation) {
      otherTexts[1].style.animation = "rise3 1.4s ease-out forwards";
    }
  };

  // Review data
  const reviews = useRef([]);

  // About page state
  const [aboutPage, setAboutPage] = useState("default");

  // Clear form on page load
  useEffect(() => {
    reviewRating = null;
    document.querySelectorAll(".fa-star").forEach((star) => {
      star.classList.replace("goodStar", "badStar");
    });
    document.getElementById("reviewForm")?.reset();
  }, []);

  // Customer rating
  let reviewRating = null;
  const setRating = (rating) => {
    const stars = document.querySelectorAll(".fa-star");
    for (let i = 0; i < stars.length; i++) {
      if (i < rating) {
        stars[i].classList.replace("badStar", "goodStar");
      } else {
        stars[i].classList.replace("goodStar", "badStar");
      }
    }
    reviewRating = rating;
  };

  // Form submission
  const [remainAnonymous, setRemainAnonymous] = useState(false);
  const acceptedEmails = [];
  function formSubmit(event) {
    if (reviewRating === null) {
      event.preventDefault();
      alert("Please select a rating.");
      return;
    } else if (
      !acceptedEmails.includes(document.getElementById("email").value)
    ) {
      event.preventDefault();
      alert("You cannot write a review.");
      return;
    } else {
      event.preventDefault();
      const form = document.getElementById("reviewForm");
      const formData = new FormData(form);
      formData.append("rating", reviewRating);
      fetch("https://formspree.io/f/mdknglzj", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            alert("Thank you for your review!");
          } else {
            alert("There was a problem with the form submission.");
          }
        })
        .catch((error) => {
          alert("There was a problem with the form submission.");
        });
      setAboutPage("default");
      setTriggerEffect(true);
    }
  }

  return (
    <>
      {aboutPage === "default" && (
        <div className="about-grid-container">
          <main className="aboutMain">
            <article className="article">
              <h1>Who We Are</h1>
              <p>
                Leffler WebDev is a customer friendly website service. We want
                to create the best possible website for you based on your needs.
                Taking care of all of the hard work, we make it easy for you to
                have an amazing website.
              </p>
            </article>
            <hr className="hr" />
            <article className="article1">
              <h1>Our Goal</h1>
              <p>
                Our upmost priorty is to make websites that you love. We want to
                make sure that our websites satisfy your needs and make you
                happy. We only want to make high quality and professional sites
                that appeal to your audience. Leffler WebDev cares about our
                customers and our goal is to make you an exceptional website.
              </p>
            </article>
            <hr className="hr" />
            <article className="article1" style={{ marginBottom: "80px" }}>
              <h1>Our Story</h1>
              <p>
                Looking for experience in frontEnd development, Leffler WebDev
                was created to put our limits to the test. Creating quality
                websites for people was our founding idea. We wanted to make a
                difference with the websites we create and are excited to see
                what the future holds for us.
              </p>
            </article>
            <div className="section">
              <h1 id="partsHeader">Call Today!</h1>
              <p>
                or fill out our{" "}
                <a className="a" onClick={() => setCurrentPage("Contact")}>
                  contact form
                </a>
              </p>
              <div className="aboutNumber">
                <i className="fa-solid fa-phone"></i>
                <a href="tel:+12528763653">(252)-876-3653</a>
              </div>

              <div className="part"></div>
              <div className="part"></div>
            </div>
          </main>
          <div className="reviews">
            {reviews.current.length > 0 && (
              <>
                <h1 className="title">Our Reviews</h1>
                {reviews.current.map((review, index) => (
                  <RevComponent key={index} review={review} />
                ))}
              </>
            )}
            <button onClick={() => setAboutPage("writeReview")}>
              Write a Review
            </button>
          </div>
        </div>
      )}
      {aboutPage === "writeReview" && (
        <div className="reviewPage">
          <a
            onClick={() => {
              setAboutPage("default");
              setTriggerEffect(true);
            }}
          >
            <i className="fa-solid fa-arrow-left-long"></i> Back
          </a>
          <form id="reviewForm" onSubmit={formSubmit}>
            <h1>Write a Review:</h1>
            <div className="stars">
              <label>How did we do? *</label>
              <br />
              <i
                className="fa-solid fa-star fa-sharp badStar"
                onClick={() => setRating(1)}
                style={{ cursor: "pointer" }}
              ></i>
              <i
                className="fa-solid fa-star fa-sharp badStar"
                onClick={() => setRating(2)}
                style={{ cursor: "pointer" }}
              ></i>
              <i
                className="fa-solid fa-star fa-sharp badStar"
                onClick={() => setRating(3)}
                style={{ cursor: "pointer" }}
              ></i>
              <i
                className="fa-solid fa-star fa-sharp badStar"
                onClick={() => setRating(4)}
                style={{ cursor: "pointer" }}
              ></i>
              <i
                className="fa-solid fa-star fa-sharp badStar"
                onClick={() => setRating(5)}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
            {!remainAnonymous && (
              <>
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Name"
                  required
                />
              </>
            )}
            {remainAnonymous && (
              <>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  id="nameNotRequired"
                  readOnly
                />
              </>
            )}
            <div className="anonymous">
              <input
                type="checkbox"
                name="anonymous"
                id="anonymous"
                onClick={() => setRemainAnonymous((prev) => !prev)}
              />
              <label htmlFor="anonymous" id="label">
                I prefer to remain anonymous
              </label>
            </div>
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example123@gmail.com"
              required
            />
            <p className="willNotShared">(This will not be shared)</p>
            <label htmlFor="review">Review *</label>
            <textarea
              name="review"
              id="review"
              cols="30"
              rows="10"
              required
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default AboutPage;
