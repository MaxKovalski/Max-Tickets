import React from "react";
import EnhancedTable from "./UserData";
import styles from "./userData.module.css";
export default function ShowUsers() {
  const [users, setUsers] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const deleteUser = async (userIds) => {
    let updatedUsers = [...users];
    for (const userId of userIds) {
      const response = await fetch(
        `http://localhost:2323/delete-user/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        updatedUsers = updatedUsers.filter((user) => user._id !== userId);
      } else {
        throw new Error(`Failed to delete user with ID: ${userId}`);
      }
    }
    return updatedUsers;
  };

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
      <EnhancedTable
        users={users}
        deleteUser={deleteUser}
        setUsers={setUsers}
      />
    </div>
  );
}
