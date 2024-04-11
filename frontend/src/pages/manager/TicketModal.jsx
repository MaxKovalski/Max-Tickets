import React, { useState } from "react";
import styles from "./ticketModal.module.css";
export default function TicketModal({ ticket, onClose }) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  if (!ticket) {
    return null;
  }
  const toggleImageModal = () => {
    setIsImageModalOpen(!isImageModalOpen);
  };
  function getPriorityColor(priority) {
    switch (priority.toLowerCase()) {
      case "high":
        return "#FF6347";
      case "medium":
        return "#FFD700";
      case "low":
        return "#90EE90";
      default:
        return "#CCCCCC";
    }
  }
  return (
    <div className={styles.modalContainer}>
      <h2 className={styles.modalTitle}>{`Title: ${ticket.title}`}</h2>
      <div
        className={styles.priority}
        style={{ color: getPriorityColor(ticket.priority) }}
      >
        Priority: {ticket.priority}
      </div>
      <h3 className={styles.modalDescription}>
        {`Description: ${ticket.description || "No Description"}`}
      </h3>
      <h4
        className={styles.modalTechName}
      >{`Name: ${ticket.name.first} ${ticket.name.last}`}</h4>
      <img
        className={styles.modalImage}
        src={`http://localhost:2323/${ticket.image}`}
        alt=""
        onClick={toggleImageModal}
      />
      <button className={styles.closeButton} onClick={onClose}>
        Close
      </button>
      {isImageModalOpen && (
        <div className={styles.imageModalOverlay} onClick={toggleImageModal}>
          <img
            src={`http://localhost:2323/${ticket.image}`}
            className={styles.imageModalContent}
            alt=""
          />
        </div>
      )}
    </div>
  );
}
