export default function TicketModal({ ticket, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "20%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        zIndex: 1000,
      }}
    >
      <h2>{ticket.title}</h2>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
