import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { IoIosArchive, IoMdArchive } from "react-icons/io";
import { motion } from "framer-motion";
import getTechTickets from "../../Components/getTechTickets";
import styles from "../manager/manageTickets.module.css";
import TicketModal from "../manager/TicketModal";
import updateTicketStatus from "../../Components/updateTicketStatus";

export default function ManageTickets() {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userToken = localStorage.getItem("token");
  useEffect(() => {
    (async () => {
      await getTechTickets(setTickets, setIsLoading);
    })();
  }, [userToken]);
  if (isLoading) {
    return <div>Loading tickets...</div>;
  }
  return (
    <div
      className={`${styles.backgroundImage} h-screen w-full text-neutral-50`}
    >
      <Board tickets={tickets} setTickets={setTickets} />
    </div>
  );
}
const Board = ({ tickets, setTickets }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const filterTicketsByStatus = (status) => {
    return tickets.filter((ticket) => ticket.status === status);
  };
  const updateTicketLocalStatus = (ticketId, newStatus) => {
    console.log("Before update:", tickets);
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === ticketId) {
        return { ...ticket, status: newStatus };
      }
      return ticket;
    });
    setTickets(updatedTickets);
    console.log("After update:", updatedTickets);
  };
  const handleTicketClick = (ticket) => {
    const fullTicket = tickets.find(
      (ticketData) => ticketData.id === ticket.id
    );

    setSelectedTicket(fullTicket);
    setIsModalOpen(true);
  };
  const statuses = ["Open", "In Progress", "Complete"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3 p-12 overflow-auto pt-28 pb-28">
      {statuses.map((status) => (
        <Column
          key={status}
          title={status}
          column={status}
          headingColor={styles.lightBlue}
          cards={filterTicketsByStatus(status)}
          onCardClick={handleTicketClick}
          updateTicketLocalStatus={updateTicketLocalStatus}
          tickets={tickets}
        />
      ))}

      {isModalOpen && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

const Column = ({
  title,
  headingColor,
  tickets,

  column,
  onCardClick,
  updateTicketLocalStatus,
}) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = async (e) => {
    const cardId = e.dataTransfer.getData("cardId");

    updateTicketLocalStatus(cardId, title);
    setActive(false);
    clearHighlights();
    try {
      await updateTicketStatus(cardId, column);
    } catch (error) {
      console.error(error);
    }

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...tickets];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const clearHighlights = (els) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredTickets = tickets.filter((ticket) => ticket.status === title);

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredTickets.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredTickets.map((ticket) => (
          <Card
            key={ticket.id}
            {...ticket}
            onCardClick={onCardClick}
            handleDragStart={handleDragStart}
          />
        ))}

        <DropIndicator beforeId={null} column={column} />
      </div>
    </div>
  );
};

const Card = ({ title, id, column, handleDragStart, onCardClick, status }) => {
  const borderColor =
    status === "In Progress"
      ? "#FFD700"
      : status === "Complete"
      ? "#32CD32"
      : "#3282B8";
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        onClick={() => onCardClick({ title, id, column })}
        className="cursor-grab rounded bg-neutral-800 p-3 active:cursor-grabbing"
        style={{
          borderColor: borderColor,
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </motion.div>
    </>
  );
};

const DropIndicator = ({ beforeId, column }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};
