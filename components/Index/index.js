import { useState } from "react";
import styles from "../../styles/Pages.module.css";
import { Modal } from "../Modal";
import { useTasks } from "../../contexts/TaskContext";
import { Pagination } from "./pagination";
import { Card } from "./card";

export default function Index({ navigateToPage }) {
  const { tasks, setTasks } = useTasks();
  const [openModal, setOpenModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 3;

  // Sort tasks by due date (most recent first)
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  const deleteTask = index => {
    console.log(index);
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const paginateNext = () => setCurrentPage(prevPage => prevPage + 1);
  const paginatePrev = () => setCurrentPage(prevPage => prevPage - 1);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <button className={styles.button} onClick={() => setOpenModal(true)}>
          {"Add +"}
        </button>
        {openModal && (
          <Modal
            onClose={() => {
              setOpenModal(false);
            }}
            isOpen={openModal}
            isEditing={false}
            task={tasks}
          />
        )}
        {tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          <>
            <div className={styles.todo}>
              {currentTasks.map((t, index) => {
                return (
                  <Card
                    key={index}
                    task={t}
                    deleteTask={() => deleteTask(indexOfFirstTask)}
                  />
                );
              })}
            </div>
            {tasks.length > tasksPerPage && (
              <Pagination
                tasksPerPage={tasksPerPage}
                totalTasks={tasks.length}
                paginateNext={paginateNext}
                paginatePrev={paginatePrev}
                currentPage={currentPage}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
