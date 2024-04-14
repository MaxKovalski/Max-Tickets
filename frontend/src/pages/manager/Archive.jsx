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
