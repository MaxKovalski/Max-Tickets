import styles from "./CreateTicket.module.css";
export default function CreateTicketForm() {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form className={styles.ticketForm}>
          <div className={styles.fieldContainer}>
            <input
              placeholder=" "
              type="text"
              name="title"
              id="title"
              onChange=""
            />

            <label htmlFor="title">Title</label>
          </div>
          <div className={styles.fieldContainer}>
            <input
              placeholder=" "
              type="text"
              name="description"
              id="description"
              onChange=""
            />
            <label htmlFor="description">Description</label>
          </div>
          <div className={styles.fieldContainer}>
            <select name="priority" id="priority">
              <option value="" disabled>
                Priority
              </option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          <div className={styles.fieldContainer}>
            <input type="file" id="myFile" name="filename" />
          </div>
          <button type="submit" className={styles.button}>
            Send Ticket
          </button>
        </form>
      </div>
    </div>
  );
}
