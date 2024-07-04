import styles from "../../styles/Modal.module.css";
import React, { useEffect, useState } from "react";
import { useTasks } from "../../contexts/TaskContext";
import { format } from "date-fns";

export const Modal = ({ isOpen, onClose, isEditing, task, key }) => {
  console.log("task", task);
  const { updateTask } = useTasks();
  const getTodayDate = () => {
    const today = new Date();
    return format(today, "yyyy-MM-dd");
  };
  const [editedTitle, setEditedTitle] = useState(task?.name);
  const [editedDueDate, setEditedDueDate] = useState(task?.dueDate);

  useEffect(() => {
    if (isEditing && task) {
      setEditedTitle(task.name);
      setEditedDueDate(task.dueDate);
    }
  }, [isEditing, task]);

  const handleSave = () => {
    console.log(task.id, editedTitle);
    updateTask(task.id, { name: editedTitle, dueDate: editedDueDate });
    onClose();
  };

  const { addTask, tasks } = useTasks();
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState(getTodayDate());

  console.log(tasks, task);

  const handleAddTask = () => {
    if (taskName && dueDate) {
      addTask({ name: taskName, dueDate });
      setTaskName("");
      setDueDate("");
      onClose();
    }
  };

  if (!isOpen) return null;
  return (
    <div>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContainer}>
          <button className={styles.modalClose} onClick={onClose}>
            &times;
          </button>
          <h2 className={styles.modalTitle}>
            {isEditing ? "Edit task" : "Add a new task"}
          </h2>
          <input
            type="text"
            placeholder="Name of task"
            className={styles.modalInput}
            value={isEditing ? editedTitle : taskName}
            onChange={e =>
              isEditing
                ? setEditedTitle(e.target.value)
                : setTaskName(e.target.value)
            }
          />
          <input
            type="date"
            required
            className={styles.modalInput}
            value={isEditing ? editedDueDate : dueDate}
            onChange={e =>
              isEditing
                ? setEditedDueDate(e.target.value)
                : setDueDate(e.target.value)
            }
            min={getTodayDate()}
          />
          <button
            className={styles.modalButton}
            onClick={() => {
              isEditing ? handleSave() : handleAddTask();
            }}
          >
            {isEditing ? "Update task" : "Add task"}
          </button>
        </div>
      </div>
    </div>
  );
};
