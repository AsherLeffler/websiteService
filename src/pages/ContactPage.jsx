import { useEffect, useState } from "react";
import "./contact.css";

const ContactPage = () => {
  const [choseCustom, setChoseCustom] = useState(false);
  const [packageActive, setPackageActive] = useState(false);
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [total, setTotal] = useState(0);
  const selections = [
    "select",
    "desDev",
    "redesign",
    "devDes",
    "hosting",
    "package",
    "custom",
  ];
  const ids = ["custom1", "custom2", "custom3", "custom4", "custom5"];

  function findAmount(e) {
    if (e.target.checked && e.target.id === "custom1") return 229.99;
    else if (!e.target.checked && e.target.id === "custom1") return -229.99;
    else if (e.target.checked && e.target.id === "custom2") return 169.99;
    else if (!e.target.checked && e.target.id === "custom2") return -169.99;
    else if (e.target.checked && e.target.id === "custom3") return 149.99;
    else if (!e.target.checked && e.target.id === "custom3") return -149.99;
    else if (e.target.checked && e.target.id === "custom4") return 60;
    else if (!e.target.checked && e.target.id === "custom4") return -60;
    else if (e.target.checked && e.target.id === "custom5") return 60;
    else if (!e.target.checked && e.target.id === "custom5") return -60;
  }

  const handleServiceSelect = (e) => {
    let newTotal = total;
    if (selections.includes(e.target.value)) {
      const seoCheckValue = document.getElementById("seoCheck")?.checked;
      switch (e.target.value) {
        case "desDev":
          newTotal = seoCheckValue ? 229.99 + 39.99 : 229.99;
          break;
        case "redesign":
          newTotal = seoCheckValue ? 169.99 + 39.99 : 169.99;
          break;
        case "devDes":
          newTotal = seoCheckValue ? 149.99 + 39.99 : 149.99;
          break;
        case "hosting":
          newTotal = seoCheckValue ? 60 + 39.99 : 60;
          break;
        case "maintenance":
          newTotal = seoCheckValue ? 60 + 39.99 : 60;
          break;
        case "package":
          newTotal = seoCheckValue ? 311.99 + 39.99 : 311.99;
          break;
        case "custom":
          newTotal = seoCheckValue ? 0 + 39.99 : 0;
          break;
        default:
          break;
      }
      const serviceSelect = document.getElementById("serviceSelect");
      if (serviceSelect.value === "custom") {
        setChoseCustom(true);
        setPackageActive(false);
      } else if (serviceSelect.value === "package") {
        setPackageActive(true);
        setChoseCustom(false);
      } else {
        setChoseCustom(false);
        setPackageActive(false);
      }
    } else if (ids.includes(e.target.id)) {
      newTotal += findAmount(e);
    } else if (e.target.id === "seoCheck") {
      if (e.target.checked) {
        newTotal += 39.99;
      } else {
        newTotal -= 39.99;
      }
    }
    setTotal(parseFloat(newTotal.toFixed(2)));
  };

  useEffect(() => {
    const form = document.getElementById("contactForm");
    if (form) {
      form.reset();
      setChoseCustom(false);
      setPackageActive(false);
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
    if (selectValue !== "select" && total !== 0) {
      event.preventDefault();
      const form = document.getElementById("contactForm");
      const formData = new FormData(form);
      formData.append("total", total);
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
              <option value="maintenance">Maintenance</option>
              <option value="package">Website package</option>
              <option value="custom">Custom service</option>
            </select>
            {choseCustom && (
              <div className="customCheck">
                <h3>Choose Services</h3>
                <input
                  type="checkbox"
                  name="Design and Develop"
                  id="custom1"
                  onChange={handleServiceSelect}
                />
                <label htmlFor="custom1" className="label1">
                  <i className="fa-solid fa-check"></i>
                </label>
                <input
                  type="checkbox"
                  name="Redesign Website"
                  id="custom2"
                  onChange={handleServiceSelect}
                />
                <label htmlFor="custom2" className="label2">
                  <i className="fa-solid fa-check"></i>
                </label>
                <input
                  type="checkbox"
                  name="Develop From Design"
                  id="custom3"
                  onChange={handleServiceSelect}
                />
                <label htmlFor="custom3" className="label3">
                  <i className="fa-solid fa-check"></i>
                </label>
                <input
                  type="checkbox"
                  name="Hosting"
                  id="custom4"
                  onChange={handleServiceSelect}
                />
                <label htmlFor="custom4" className="label4">
                  <i className="fa-solid fa-check"></i>
                </label>
                <input
                  type="checkbox"
                  name="Maintenance"
                  id="custom5"
                  onChange={handleServiceSelect}
                />
                <label htmlFor="custom5" className="label5">
                  <i className="fa-solid fa-check"></i>
                </label>
              </div>
            )}
            {!packageActive && (
              <>
                <input
                  type="checkbox"
                  name="seoCheck"
                  id="seoCheck"
                  onChange={handleServiceSelect}
                />
                <label htmlFor="seoCheck" className="seoCheckLabel">
                  <i className="fa-solid fa-check"></i>
                </label>
              </>
            )}
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
          {total !== 0 && <p>Base Total: ~ ${total}</p>}
          <button type="submit">Send</button>
        </form>
      </main>
    </div>
  );
};

export default ContactPage;
