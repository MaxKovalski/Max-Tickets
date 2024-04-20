export default async function Archive(cardId) {
  try {
    console.log(cardId);
    const response = await fetch("http://localhost:2323/archive-ticket", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ _id: cardId }),
    });
  } catch (error) {
    console.error("Failed to toggle archive status:", error);
  }
}
export async function DeleteTicket(cardId) {
  try {
    console.log("Deleting ticket:", cardId);
    const response = await fetch(
      `http://localhost:2323/delete-ticket/${cardId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    if (response.ok) {
      console.log("Ticket deleted successfully");
    } else {
      throw new Error("Failed to delete the ticket");
    }
  } catch (error) {
    console.error("Failed to delete the ticket:", error);
  }
}
