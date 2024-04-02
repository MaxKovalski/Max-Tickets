import { v4 as uuidv4 } from "uuid";
export default async function getTechs(userToken, setTechs, setIsLoading) {
  setIsLoading(true);
  try {
    const response = await fetch("http://localhost:2323/techs", {
      method: "GET",
      headers: {
        Authorization: userToken,
      },
    });
    const data = await response.json();
    const columnTechs = data.map((techs) => ({
      ...techs,
      column: "New Tickets",
      id: uuidv4(),
    }));
    setTechs(columnTechs);
    setIsLoading(false);

    return data;
  } catch (error) {
    console.error(error);
    setIsLoading(false);
  }
}
