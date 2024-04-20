import React from "react";
import EnhancedTable from "./UserData";
import styles from "./Css/AdminTools.module.css";

import UserModal from "./UserModal";
import Loading from "../../Components/Loading";
import EnhancedTableTickets from "./TicketData";

export default function ShowUsers() {
  const [users, setUsers] = React.useState(null);
  const [tickets, setTickets] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [toggle, setToggle] = React.useState(true);
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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
  const deleteTicket = async (ticketIds) => {
    let updatedTickets = [...tickets];
    for (const ticketId of ticketIds) {
      const response = await fetch(
        `http://localhost:2323/delete-ticket/${ticketId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        updatedTickets = updatedTickets.filter(
          (ticket) => ticket._id !== ticketId
        );
      } else {
        throw new Error(`Failed to delete user with ID: ${ticketId}`);
      }
    }
    return updatedTickets;
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

    const fetchTickets = async () => {
      try {
        const response = await fetch("http://localhost:2323/tickets", {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const dataTickets = await response.json();
        setTickets(dataTickets);
      } catch (error) {
        console.error("Fetching error:", error);
        setError(error);
        setIsLoading(false);
      }
    };
    fetchUsers();
    fetchTickets();
  }, []);
  const handleSaveUser = (response) => {
    const updatedUser = response.user;
    console.log(updatedUser);
    const updatedUsers = users.map((user) => {
      if (user._id === updatedUser._id) {
        return updatedUser;
      }
      return user;
    });
    setUsers(updatedUsers);
  };
  const editUser = (userIds) => {
    const user = users.find((user) => user._id === userIds[0]);

    setSelectedUser(user);
    handleOpenModal();
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className={styles.backgroundImage}>
      <button
        className={styles.toggleButton}
        onClick={() => setToggle(!toggle)}
      >
        {toggle ? "tickets" : "users"}
      </button>
      {toggle ? (
        <EnhancedTable
          users={users}
          deleteUser={deleteUser}
          setUsers={setUsers}
          editUser={editUser}
        />
      ) : (
        <EnhancedTableTickets
          tickets={tickets}
          deleteTicket={deleteTicket}
          setTickets={setTickets}
        />
      )}

      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedUser={selectedUser}
        onSave={handleSaveUser}
      />
    </div>
  );
}
