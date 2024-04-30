import React from "react";
import styles from "./Css/userModal.module.css";
import AnimatedPage from "../../assets/AnimatedPage";
function UserModal({ isOpen, onClose, selectedUser, onSave }) {
  if (!isOpen) return null;
  const [userDetails, setUserDetails] = React.useState(selectedUser);

  const permissionMapping = {
    none: 0,
    client: 1,
    tech: 2,
    manager: 3,
    admin: 4,
  };
  React.useEffect(() => {
    setUserDetails(selectedUser);
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [parentKey, childKey] = name.split(".");
    if (childKey) {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        [parentKey]: { ...prevDetails[parentKey], [childKey]: value },
      }));
    } else {
      const newValue = name === "permission" ? permissionMapping[value] : value;
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        [name]: newValue,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userDetails._id);
    try {
      const response = await fetch(
        `http://localhost:2323/edit-user/${userDetails._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(userDetails),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      onSave(await response.json());
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <AnimatedPage>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <h4>
            Edit: {userDetails.name.first} {userDetails.name.last}
            <br />
          </h4>

          <form className={styles.userEditFrom} onSubmit={handleSubmit}>
            <div className={styles.fieldContainer}>
              <input
                placeholder=" "
                type="text"
                name="name.first"
                id="first"
                onChange={handleChange}
                value={userDetails.name.first}
              />
              <label htmlFor="first">Name</label>
            </div>
            <div className={styles.fieldContainer}>
              <input
                placeholder=" "
                type="text"
                name="name.last"
                id="last"
                onChange={handleChange}
                value={userDetails.name.last}
              />
              <label htmlFor="last">Last Name</label>
            </div>
            <div className={styles.fieldContainer}>
              <input
                placeholder=" "
                type="text"
                name="email"
                id="email"
                onChange={handleChange}
                value={userDetails.email}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className={styles.fieldContainer}>
              <select
                id="permission"
                name="permission"
                onChange={handleChange}
                value={Object.keys(permissionMapping).find(
                  (key) => permissionMapping[key] === userDetails.permission
                )}
              >
                <option value="none">None</option>
                <option value="client">Client</option>
                <option value="tech">Tech</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
              <label htmlFor="permission">Permission</label>
            </div>

            <button type="submit" className={styles.buttons}>
              Save Changes
            </button>
            <button onClick={onClose} className={styles.buttons}>
              Close
            </button>
          </form>
        </div>
      </div>
    </AnimatedPage>
  );
}

export default UserModal;
