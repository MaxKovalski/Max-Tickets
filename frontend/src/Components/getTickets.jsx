export default async function getTickets(userToken, setTickets, setIsLoading) {
  setIsLoading(true);

  console.log(userToken);
  try {
    const response = await fetch("http://localhost:2323/tickets-open", {
      method: "GET",
      headers: {
        Authorization: userToken,
      },
    });
    const data = await response.json();
    console.log(data);
    const filteredData = data.filter((ticket) => !ticket.archive);
    const columnTickets = filteredData.map((ticket) => ({
      ...ticket,
      column:
        ticket.techName === "not assigned" ? "New Tickets" : ticket.techName,
      id: ticket._id,
      status: ticket.status,
    }));
    setTickets(columnTickets);
    setIsLoading(false);
    console.log(data);
  } catch (error) {
    console.error(error);
    setIsLoading(false);
  }
}
