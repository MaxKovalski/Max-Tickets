import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./singePageWebSite.module.css";
import backgroundVideo from "../../image/BackgroundVideo/Background-Video.mp4";
import customerSupport from "../../image/featuresImages/customerSupport.png";
import dataAnalytics from "../../image/featuresImages/dataAnalytics.png";
import Integration from "../../image/featuresImages/intergration.png";
import realTime from "../../image/featuresImages/realTime.png";
import { useForm, ValidationError } from "@formspree/react";
function ContactForm() {
  const [state, handleSubmit] = useForm("xrgnrbke");

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <div className={styles.fieldContainer}>
        <input placeholder=" " type="text" name="name" id="name" />
        <label htmlFor="name">Name</label>
      </div>
      <div className={styles.fieldContainer}>
        <input placeholder=" " type="text" name="email" id="email" />

        <label htmlFor="email">Email</label>
      </div>
      <ValidationError
        prefix="Email"
        field="email"
        errors={state.errors}
        className={styles.errorForm}
      />
      <div className={`${styles.fieldContainer} ${styles.description}`}>
        <textarea
          placeholder=" "
          rows="4"
          cols="50"
          name="description"
          id="description"
          className={styles.description}
        />
        <label htmlFor="description">Description</label>
      </div>
      <button
        type="submit"
        disabled={state.submitting}
        className={styles.contactButton}
      >
        Send
      </button>
      {state.succeeded && (
        <p className={styles.successMessage}>Thanks for reaching out!</p>
      )}
    </form>
  );
}
export default function SinglePageWebSite() {
  let navigate = useNavigate();
  return (
    <div>
      <div className={styles.backgroundVideoWrapper}>
        <video autoPlay loop muted className={styles.backgroundVideo}>
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div className={styles.hero}>
          <h1>Welcome to Max Tickets</h1>
          <p>Streamline your customer service with efficiency and ease.</p>
          <button
            className={styles.ctaButton}
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
        </div>
      </div>
      <div className={styles.features}>
        <h2>Key Features</h2>
        <div className={styles.featureCards}>
          <div className={styles.cards}>
            <img src={realTime} alt="Feature 1" />
            <h3>Real-time Tracking</h3>
            <p>Monitor tickets as they come in real-time.</p>
          </div>
          <div className={styles.cards}>
            <img src={dataAnalytics} alt="Feature 2" />
            <h3>Data Analytics</h3>
            <p>Access comprehensive analytics for data-driven decisions.</p>
          </div>
          <div className={styles.cards}>
            <img src={Integration} alt="Feature 3" />
            <h3>Integration & Customization</h3>
            <p>Easily integrate or customize with your existing system.</p>
          </div>
          <div className={styles.cards}>
            <img src={customerSupport} alt="Feature 3" />
            <h3> 24/7 Customer Support</h3>
            <p>
              Get instant support day or night, ensuring seamless operations for
              your business.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.testimonials} id="testimonials">
        <h2>What Our Users Say</h2>
        <div className={styles.testimonialContainer}>
          <div className={styles.testimonialCard}>
            <p>
              "Max Tickets has transformed our customer service department!"
            </p>
            <cite>- Voltex</cite>
          </div>
          <div className={styles.testimonialCard}>
            <p>
              "The real-time tracking feature is a game-changer for our
              operations."
            </p>
            <cite>- Zyxto</cite>
          </div>
          <div className={styles.testimonialCard}>
            <p>
              "Excellent support and easy integration with our existing
              systems."
            </p>
            <cite>- Gizmad</cite>
          </div>
        </div>
      </div>
      <div className={styles.formContainer}>
        <video autoPlay loop muted className={styles.backgroundVideo}>
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <h2>Contact</h2>
        <ContactForm />
      </div>
      <div className={styles.footerSection}>
        <div className={styles.socialIcons}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
        <div>Follow Us on Social Media</div>
      </div>
    </div>
  );
}
