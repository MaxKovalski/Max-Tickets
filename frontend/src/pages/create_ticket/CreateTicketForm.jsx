import React, { useState } from "react";
import Joi from "joi";
import styles from "./CreateTicket.module.css";

export default function CreateTicketForm({ handleSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const schema = Joi.object({
    title: Joi.string().required().messages({
      "string.empty": "Title is required.",
      "any.required": "Title is required.",
    }),
  }).options({ allowUnknown: true });

  const validateForm = () => {
    const { error } = schema.validate(formData, { abortEarly: false });
    if (error) {
      const newErrors = error.details.reduce((acc, current) => {
        acc[current.path[0]] = current.message;
        return acc;
      }, {});
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (validateForm()) {
      await handleSubmit(e);
      setIsSubmitted(true);
      setFormData({
        title: "",
        description: "",
        priority: "",
        image: null,
      });
    }
    setSubmitting(false);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]:
        event.target.type === "file"
          ? event.target.files[0]
          : event.target.value,
    });
    if (errors[event.target.name]) {
      setErrors({
        ...errors,
        [event.target.name]: null,
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.container}>
        <div className={`${styles.formContainer}`}>
          <h1>Your ticket has been opened!</h1>
          <h2>Please wait for call from our team.</h2>
          <button
            onClick={() => setIsSubmitted(false)}
            className={styles.customButton}
            style={{ marginTop: "30px" }}
          >
            Open new ticket
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form onSubmit={handleFormSubmit} className={styles.ticketForm}>
          <div className={styles.fieldContainer}>
            <input
              placeholder=" "
              type="text"
              name="title"
              id="title"
              onChange={handleChange}
              value={formData.title}
              className={styles.title}
            />
            <label htmlFor="title">Title</label>
            {errors.title && <div className={styles.error}>{errors.title}</div>}
          </div>
          <div className={`${styles.fieldContainer} ${styles.description}`}>
            <textarea
              placeholder=" "
              rows="4"
              cols="50"
              name="description"
              id="description"
              onChange={handleChange}
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
          <button
            type="submit"
            className={styles.ticketButton}
            disabled={submitting}
          >
            Send Ticket
          </button>
        </form>
      </div>
    </div>
  );
}
