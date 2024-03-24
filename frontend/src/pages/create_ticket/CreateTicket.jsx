import React from "react";
import CreateTicketForm from "./CreateTicketForm";

export default function CreateTicket() {
  // const [ticketData, setTicketData] = React.useState({});
  const userToken = localStorage.getItem("token");

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
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div>
      <CreateTicketForm handleSubmit={handleSubmit} />
    </div>
  );
}
