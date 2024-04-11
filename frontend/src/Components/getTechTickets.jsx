import { jwtDecode } from "jwt-decode";

export default async function getTechTickets(setTickets, setIsLoading) {
  const userToken = localStorage.getItem("token");
  const userAuth = jwtDecode(userToken);
  const techName = `${userAuth.name.first} ${userAuth.name.last}`;
  setIsLoading(true);
  try {
    const response = await fetch(
      `http://localhost:2323/tickets/tech/${encodeURIComponent(techName)}`,
      {
        method: "GET",
        headers: {
          Authorization: userToken,
        },
      }
    );
    const data = await response.json();

    const columnTickets = data.map((ticket) => ({
      ...ticket,
      id: ticket._id,
      status: ticket.status,
    }));

    setTickets(columnTickets);

    setIsLoading(false);
  } catch (error) {
    console.error(error);
    setIsLoading(true);
  }
}
