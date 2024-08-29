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
            <input type="checkbox" name="seoCheck" id="seoCheck" />
          </div>
          {choseCustom && (
            <div>
              <label htmlFor="custom1">Design and develop</label>
              <input type="checkbox" name="custom1" id="custom1" />
              <label htmlFor="custom2">Redesign website</label>
              <input type="checkbox" name="custom2" id="custom2" />
              <label htmlFor="custom3">Develop from design</label>
              <input type="checkbox" name="custom3" id="custom3" />
              <label htmlFor="custom4">Hosting</label>
              <input type="checkbox" name="custom4" id="custom4" />
            </div>
          )}
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
          <textarea name="otherInfo" id="otherInfo" required />
          <button type="submit">Send</button>
        </form>      
      </main>
    </div>
  );
};

export default ContactPage;
