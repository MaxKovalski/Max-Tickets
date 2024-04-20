import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { IoIosArchive, IoMdArchive } from "react-icons/io";
import { motion } from "framer-motion";
import getTickets from "../../Components/getTickets";
import getTechs from "../../Components/getTechs";
import updateTicketTech from "../../Components/updateTicketTech";
import CreateTicket from "../create_ticket/CreateTicket";
import styles from "./manageTickets.module.css";
import TicketModal from "./TicketModal";
import ArchiveTicket from "../../Components/ArchiveTicket";
import Loading from "../../Components/Loading";
export default function ManageTickets() {
  const [tickets, setTickets] = useState([]);
  const [techs, setTechs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const userToken = localStorage.getItem("token");
  useEffect(() => {
    (async () => {
      await getTickets(userToken, setTickets, setIsLoading);
      await getTechs(userToken, setTechs, setIsLoading);
    })();
  }, [userToken]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div
      className={`${styles.backgroundImage} h-screen w-full text-neutral-50`}
    >
      <div className="flex justify-center items-center pt-20">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3 p-2 rounded bg-neutral-800 text-neutral-50"
        />
      </div>
      <Board
        tickets={tickets.filter((ticket) =>
          ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        techs={techs}
      />
    </div>
  );
}
const Board = ({ tickets, techs, getTickets }) => {
  const [cards, setCards] = useState([...tickets]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    setCards(
      tickets.filter((ticket) =>
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [tickets, searchTerm]);
  const handleTicketClick = (ticket) => {
    const fullTicket = tickets.find(
      (ticketData) => ticketData.id === ticket.id
    );

    setSelectedTicket(fullTicket);
    setIsModalOpen(true);
  };
  <AddCard setCards={setCards} getTickets={getTickets} />;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3 p-12 overflow-auto pb-28">
      <Column
        title="New Tickets"
        column="New Tickets"
        headingColor={styles.lightBlue}
        cards={cards}
        setCards={setCards}
        onCardClick={handleTicketClick}
      />
      {techs.map((tech) => (
        <Column
          key={tech.id}
          title={`${tech.name.first} ${tech.name.last}`}
          column={tech.name.first + " " + tech.name.last}
          headingColor={styles.lightBlue}
          cards={cards}
          setCards={setCards}
          onCardClick={handleTicketClick}
        />
      ))}
      {isModalOpen && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <BurnBarrel setCards={setCards} />
    </div>
  );
};

const Column = ({
  title,
  headingColor,
  cards,
  column,
  setCards,
  onCardClick,
}) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = async (e) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();
    try {
      await updateTicketTech(cardId, column);
    } catch (error) {
      console.error(error);
    }
    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

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

      setCards(copy);
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

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors  ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => (
          <Card
            key={c.id}
            {...c}
            status={c.status}
            handleDragStart={handleDragStart}
            onCardClick={onCardClick}
          />
        ))}
        <DropIndicator beforeId={null} column={column} />

        {column === "New Tickets" && (
          <AddCard
            column={column}
            key={filteredCards._id}
            setCards={setCards}
          />
        )}
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
      className="my-0.5 h-0.5 w-full bg-blue-400 opacity-0"
    />
  );
};

const BurnBarrel = ({ setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = async (e) => {
    const cardId = e.dataTransfer.getData("cardId");
    setCards((pv) => pv.filter((c) => c._id !== cardId));
    await ArchiveTicket(cardId);
    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? <IoMdArchive className="animate-bounce" /> : <IoIosArchive />}
    </div>
  );
};

const AddCard = ({ setCards }) => {
  const [adding, setAdding] = useState(false);

  const handleNewTicket = (response) => {
    const newTicket = {
      id: response._id,
      title: response.title,
      column: "New Tickets",
    };
    setCards((prevCards) => [...prevCards, newTicket]);
    setAdding(false);
  };
  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setAdding(false);
    }
  };
  return (
    <>
      {adding ? (
        <div className={styles.modalBackdrop} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <CreateTicket
              onTicketAdded={handleNewTicket}
              useBackground={false}
            />
          </div>
        </div>
      ) : (
        <motion.button
          onClick={() => setAdding(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-s text-neutral-400 hover:text-neutral-50"
        >
          <span className={styles.lightBlue}>Add Ticket</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};
