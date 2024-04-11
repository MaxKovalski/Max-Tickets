import React from "react";
import CreateTicketForm from "./CreateTicketForm";
import styles from "./CreateTicket.module.css";
export default function CreateTicket({ onTicketAdded, useBackground = true }) {
  // const [ticketData, setTicketData] = React.useState({});
  const userToken = localStorage.getItem("token");
  const containerStyle = useBackground
    ? styles.backgroundImage
    : styles.noBackground;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ticketInputs = new FormData(e.target);
      const response = await fetch("http://localhost:2323/create-ticket", {
        method: "POST",
        headers: {
          Authorization: userToken,
        },

        body: ticketInputs,
      });
      if (!useBackground) {
        const newTicket = await response.json();
        onTicketAdded(newTicket);
        console.log(newTicket);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className={containerStyle}>
      <CreateTicketForm handleSubmit={handleSubmit} />
    </div>
  );
}
