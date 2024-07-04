import { useState } from "react";
import styles from "../../styles/Pages.module.css";
import { formatDate, todaysDate } from "./utils";
import { Modal } from "../Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { format, parseISO } from "date-fns";

export const Card = ({ task, deleteTask, key }) => {
  const [showModal, setShowModal] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.card}>
      <div
        className={todaysDate(task.dueDate) ? styles.todaytitle : styles.title}
      >
        {formatDate(task.dueDate)} &bull;{" "}
        {format(parseISO(task.dueDate), "MMMM do, yyyy")}
      </div>
      <div className={styles.flex}>
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className={styles.checked}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={isChecked ? styles.checkedtitle : styles.title}>
              {task.name}
            </div>
            <div className={styles.delete}>
              <button
                className={styles.trash}
                onClick={() => {
                  deleteTask();
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button
                onClick={() => setShowModal(true)}
                className={styles.edit}
              >
                Edit
              </button>
              <Modal
                onClose={() => {
                  setShowModal(false);
                }}
                isOpen={showModal}
                isEditing={true}
                task={task}
                key={key}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
