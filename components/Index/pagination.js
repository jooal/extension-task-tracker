import styles from "../../styles/Pages.module.css";

export const Pagination = ({
  tasksPerPage,
  totalTasks,
  paginateNext,
  paginatePrev,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  return (
    <nav className={styles.nav}>
      <button
        onClick={paginatePrev}
        disabled={currentPage === 1}
        className="page-link"
      >
        &laquo;
      </button>
      <button
        onClick={paginateNext}
        disabled={currentPage === totalPages}
        className="page-link"
      >
        &raquo;
      </button>
    </nav>
  );
};
