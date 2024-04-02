export default async function getTickets(userToken, setTickets, setIsLoading) {
  setIsLoading(true);
  try {
    const response = await fetch("http://localhost:2323/tickets", {
      method: "GET",
      headers: {
        Authorization: userToken,
      },
    });
    const data = await response.json();
    const columnTickets = data.map((ticket) => ({
      ...ticket,
      column:
        ticket.techName === "not assigned" ? "New Tickets" : ticket.techName,
      id: ticket._id,
    }));
    setTickets(columnTickets);
    setIsLoading(false);
    console.log(data);
  } catch (error) {
    console.error(error);
    setIsLoading(false);
  }
}
