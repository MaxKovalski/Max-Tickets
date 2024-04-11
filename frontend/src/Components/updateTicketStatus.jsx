export default async function updateTicketStatus(ticketId, status) {
  const userToken = localStorage.getItem("token");
  status;
  try {
    const response = await fetch("http://localhost:2323/update-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userToken,
      },
      body: JSON.stringify({ _id: ticketId, status }),
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
