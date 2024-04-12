import React from "react";
import EnhancedTable from "./UserData";
import styles from "./userData.module.css";
export default function AdminTools() {
  const [users, setUsers] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:2323/users", {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const dataUsers = await response.json();
        console.log(dataUsers);
        setUsers(dataUsers);
        setIsLoading(false);
      } catch (error) {
        console.error("Fetching error:", error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.backgroundImage}>
      <EnhancedTable users={users} />
    </div>
  );
}
