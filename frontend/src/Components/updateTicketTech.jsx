export default async function updateTicketTech(ticketId, column) {
  const userToken = localStorage.getItem("token");
  let techName = column !== "New Tickets" ? column : "not assigned";
  try {
    const response = await fetch("http://localhost:2323/update-tech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userToken,
      },
      body: JSON.stringify({ _id: ticketId, techName }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
