import { useEffect, useRef, useState } from "react";
import RevComponent from "./RevComponent";

const AboutPage = () => {
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
    const otherTexts = document.querySelectorAll(".article1");
    if (otherTexts.length !== 0) {
      if (window.scrollY > 260 && !otherTexts[0].style.animation) {
        otherTexts[0].style.animation = "rise3 1.4s ease-out forwards";
      }
      if (window.scrollY > 480 && !otherTexts[1].style.animation) {
        otherTexts[1].style.animation = "rise3 1.4s ease-out forwards";
      }
      if (window.scrollY > 700 && !otherTexts[2].style.animation) {
        otherTexts[2].style.animation = "rise3 1.4s ease-out forwards";
      }
    }
  };

  // Review data

  /* Template
        {
          name: "Name",
          rating: #,
          review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          }
    */

  const reviews = useRef([]);

  // About page state
  const [aboutPage, setAboutPage] = useState("default");

  // Clear form on page load
  const reviewRatingRef = useRef(null);
  useEffect(() => {
    reviewRatingRef.current = null;
    document.querySelectorAll(".fa-star").forEach((star) => {
      star.classList.replace("goodStar", "badStar");
    });
    document.getElementById("reviewForm")?.reset();
  }, []);

  // Customer rating
  const setRating = (rating) => {
    const stars = document.querySelectorAll(".fa-star");
    for (let i = 0; i < stars.length; i++) {
      if (i < rating) {
        stars[i].classList.replace("badStar", "goodStar");
      } else {
        stars[i].classList.replace("goodStar", "badStar");
      }
    }
    reviewRatingRef.current = rating;
  };

  // Form submission
  const [remainAnonymous, setRemainAnonymous] = useState(false);
  const acceptedEmails = [];

  function formSubmit(event) {
    if (reviewRatingRef.current === null) {
      event.preventDefault();
      alert("Please select a rating.");
      return;
    } else if (
      !acceptedEmails.includes(document.getElementById("email").value)
    ) {
      event.preventDefault();
      alert("You need to have purchased a service before writing a review.");
      return;
    } else {
      event.preventDefault();
      const form = document.getElementById("reviewForm");
      const formData = new FormData(form);
      formData.append("rating", reviewRatingRef.current);
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
        .catch(() => {
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
            <article className="article1">
              <h1>Our Story</h1>
              <p>
                Looking for experience in front-end development, Leffler WebDev
                was created to put our limits to the test. Creating quality
                websites for people was our founding idea. We wanted to make a
                difference with the websites we create and are excited to see
                what the future holds for us.
              </p>
            </article>
            <hr className="hr" />
            <article className="article1" style={{ marginBottom: "80px" }}>
              <h1>Home Base</h1>
              <p>
                Located in Raleigh, North Carolina, we proudly extend our
                exceptional services across the entire United States. No matter
                where you are, our expertise is just a call or click away.
                Operating on Eastern Time (EST), our team is available
                throughout the business week, ready to partner with you and
                deliver top-notch services that exceed expectations. Your
                success is our priority, and we&apos;re always here to assist,
                regardless of your location or time zone.
              </p>
            </article>
            {reviews.current.length > 0 && (
              <>
                <h1 className="title">What Our Customers Have To Say</h1>
                {reviews.current.map((review, index) => (
                  <RevComponent key={index} review={review} />
                ))}
              </>
            )}
            <div
              className="reviews"
              onClick={() => setAboutPage("writeReview")}
            >
              <h1 className="h1">Write A Review Today!</h1>
            </div>
          </main>
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
                <input type="text" name="fullName" id="fullName" required />
              </>
            )}
            {remainAnonymous && (
              <>
                <label htmlFor="name" id="nameNotRequiredLabel">
                  Full Name
                </label>
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
                <i className="fa-solid fa-check"></i>
              </label>
            </div>
            <label htmlFor="email">Email *</label>
            <input type="email" name="email" id="email" required />
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
