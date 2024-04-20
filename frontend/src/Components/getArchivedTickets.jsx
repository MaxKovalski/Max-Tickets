export default async function getArchivedTickets(
  userToken,
  setTickets,
  setIsLoading
) {
  setIsLoading(true);
  try {
    const response = await fetch("http://localhost:2323/tickets/archived", {
      method: "GET",
      headers: {
        Authorization: userToken,
      },
    });
    const data = await response.json();
    console.log(data);
    const filteredData = data.filter((ticket) => ticket.archive === true);
    const columnTickets = filteredData.map((ticket) => ({
      ...ticket,
      column: ticket.archive === true ? "Archived Tickets" : "",
      id: ticket._id,
      status: ticket.status,
    }));
    setTickets(columnTickets);
    setIsLoading(false);
    console.log(data);
  } catch (error) {
    localStorage.removeItem("token");
    console.error(error);
    setIsLoading(true);
  }
}
