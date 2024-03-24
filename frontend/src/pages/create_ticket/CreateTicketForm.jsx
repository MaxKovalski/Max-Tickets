import styles from "./CreateTicket.module.css";
export default function CreateTicketForm({ handleSubmit }) {
  const onChangeErrorRemove = (event) => {};
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.ticketForm}>
          <div className={styles.fieldContainer}>
            <input
              placeholder=" "
              type="text"
              name="title"
              id="title"
              onChange={onChangeErrorRemove}
              className={styles.title}
            />

            <label htmlFor="title">Title</label>
          </div>
          <div className={`${styles.fieldContainer} ${styles.description}`}>
            <textarea
              placeholder=" "
              rows="4"
              cols="50"
              name="description"
              id="description"
              onChange={onChangeErrorRemove}
              className={styles.description}
            />
            <label htmlFor="description">Description</label>
          </div>
          <div className={styles.priorityImageContainer}>
            <div
              className={`${styles.fieldContainer} ${styles.prioritySelect}`}
            >
              <select name="priority" id="priority" className={styles.priority}>
                <option value="" disabled>
                  Priority
                </option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div className={styles.fileUploadButton}>
              <input
                type="file"
                id="image"
                name="image"
                className={styles.hiddenFileInput}
              />
              <label htmlFor="image" className={styles.customButton}>
                Upload Image
              </label>
            </div>
          </div>
          <button type="submit" className={styles.ticketButton}>
            Send Ticket
          </button>
        </form>
      </div>
    </div>
  );
}
