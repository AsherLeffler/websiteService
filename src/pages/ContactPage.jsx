import { useEffect, useState } from "react";
import "./contact.css";

const ContactPage = () => {
  const [choseCustom, setChoseCustom] = useState(false);
  const [triggerEffect, setTriggerEffect] = useState(false);

  useEffect(() => {
    const form = document.getElementById("contactForm");
    if (form) {
      form.reset();
    }
    anime({
      targets: "#contactForm",
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 3200,
      delay: 100,
    });
    
    setTriggerEffect(false);
  }, [triggerEffect]);

  const handleServiceSelect = () => {
    const serviceSelect = document.getElementById("serviceSelect");
    if (serviceSelect.value === "custom") {
      setChoseCustom(true);
    } else {
      setChoseCustom(false);
    }
  };

  const [textError, setTextError] = useState(false);
  const handleTextChange = () => {
    const phone = document.getElementById("phone");
    const phoneRegEx = /^\d{10}$/;
    if (!phone.value.match(phoneRegEx)) {
      setTextError(true);
      phone.value = phone.value.replace(/[^0-9]/g, "");
    } else if (phone.value.match(phoneRegEx)) {
      phone.value = `(${phone.value.slice(0, 3)})-${phone.value.slice(
        3,
        6
      )}-${phone.value.slice(6)}`;
      setTextError(false);
    } else if (phone.value === "") {
      setTextError(false);
      phone.value = phone.value.replace(/[^0-9]/g, "");
    }
  };

  function formSubmit(event) {
    const selectValue = document.getElementById("serviceSelect").value;
    event.preventDefault();
    if (selectValue !== "select") {
      event.preventDefault();
      const form = document.getElementById("contactForm");
      const formData = new FormData(form);
      setTriggerEffect(true);
      fetch("https://formspree.io/f/xrbzjrzp", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            alert("Thank you, we will respond shortly!");
          } else {
            alert("There was a problem with the form submission.");
          }
        })
        .catch((error) => {
          alert("There was a problem with the form submission.");
        });
      setAboutPage("default");
      setTriggerEffect(true);
      setChoseCustom(false);
    } else {
      alert("Please select a service");
    }
  }

  return (
    <div className="contact-grid-container">
      <main className="contactMain">
        <form method="POST" onSubmit={formSubmit} id="contactForm">
          <h1>Contact Us</h1>
          <label htmlFor="serviceSelect">Select a Service</label>
          <div className="selectCont">
            <select
              name="serviceSelect"
              id="serviceSelect"
              onChange={handleServiceSelect}
              defaultValue={"select"}
              required
            >
              <option value="select">Select</option>
              <option value="desDev">Design and develop</option>
              <option value="redesign">Redesign website</option>
              <option value="devDes">Develop from design</option>
              <option value="hosting">Hosting</option>
              <option value="custom">Custom service</option>
            </select>
            {choseCustom && (
              <div className="customCheck">
                <h3>Choose Services</h3>
                <input type="checkbox" name="Design and Develop" id="custom1" />
                <label htmlFor="custom1" className="label1">
                  <i className="fa-solid fa-check"></i>
                </label>
                <input type="checkbox" name="Redesign Website" id="custom2" />
                <label htmlFor="custom2" className="label2">
                  <i className="fa-solid fa-check"></i>
                </label>
                <input
                  type="checkbox"
                  name="Develop From Design"
                  id="custom3"
                />
                <label htmlFor="custom3" className="label3">
                  <i className="fa-solid fa-check"></i>
                </label>
                <input type="checkbox" name="Hosting" id="custom4" />
                <label htmlFor="custom4" className="label4">
                  <i className="fa-solid fa-check"></i>
                </label>
              </div>
            )}
            <input type="checkbox" name="seoCheck" id="seoCheck" />
            <label htmlFor="seoCheck" className="seoCheckLabel">
              <i className="fa-solid fa-check"></i>
            </label>
          </div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            name="phone"
            id="phone"
            onChange={handleTextChange}
            required
          />
          {textError && (
            <p className="error">Please enter a valid phone number</p>
          )}
          <label htmlFor="otherInfo">Other Information</label>
          <textarea name="otherInfo" id="otherInfo" />
          <button type="submit">Send</button>
        </form>
      </main>
    </div>
  );
};

export default ContactPage;
