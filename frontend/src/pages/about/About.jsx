import React from "react";
import styles from "./about.module.css";
import backgroundVideo from "../../image/BackgroundVideo/Background-Video.mp4";
export default function About() {
  return (
    <div className={styles.container}>
      <video autoPlay loop muted className={styles.backgroundVideo}>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <h1 className={styles.header}>About Max-Ticket</h1>
      <p>
        Max-Ticket is your cutting-edge solution for effective and efficient
        ticket management. Designed with robustness and ease of use in mind, our
        system simplifies the complex process of managing tickets from creation
        to resolution, making it an ideal choice for organizations looking to
        enhance their operational efficiencies.
      </p>
      <h2 className={styles.header}>How It Works</h2>
      <div className={styles.infoSection}>
        <strong>1. Getting Started:</strong>
        <p>
          Register and log in to create your user profile. You'll get immediate
          access to basic features, with additional capabilities available upon
          admin approval.
        </p>
      </div>
      <div className={styles.infoSection}>
        <strong>2. Ticket Creation:</strong>
        <p>
          Use our intuitive interface to submit a new ticket. Specify details
          like title, description, priority level, and optionally attach photos.
        </p>
      </div>
      <div className={styles.infoSection}>
        <strong>3. Ticket Management:</strong>
        <p>
          Managers review submitted tickets, assign them to the appropriate
          technicians, and monitor their progress. Technicians update ticket
          statuses as they work towards resolution.
        </p>
      </div>
      <div className={styles.infoSection}>
        <strong>4. Administration:</strong>
        <p>
          Admins oversee the platform, managing user roles, permissions, and all
          ticket-related actions to ensure everything runs smoothly.
        </p>
      </div>
      <h2 className={styles.header}>Technology Stack</h2>
      <ul className={styles.feature}>
        <li>Front-End: React, Material-UI, TailWindCss, Framer-Motion</li>
        <li>Back-End: MongoDB, Express.js, Mongoose, JsonWebToken</li>
        <li>Validation & Security: Joi, Bcryptjs</li>
      </ul>
      <h2 className={styles.header}>Contact Us</h2>
      <p>
        Got questions or need support? Reach out to us through our contact page
        or follow us on social media to stay updated on new features and
        announcements.
      </p>
    </div>
  );
}
