import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";

import {setCurrentPage } from "../../redux/slices/filterSlice";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const dispatch = useDispatch();
  const page = useSelector((state: any) => state.filters.currentPage);

  return (
    <ReactPaginate
      className={styles.container}
      pageLinkClassName={styles.pageLink}
      previousLinkClassName={styles.pageLink}
      nextLinkClassName={styles.pageLink}
      activeLinkClassName={styles.activeLink}
      breakLabel="..."
      nextLabel=">"
      pageRangeDisplayed={4}
      pageCount={totalPages}
      previousLabel="<"
      onPageChange={(event) => dispatch(setCurrentPage(event.selected))}
      renderOnZeroPageCount={null}
      forcePage={page}
    />
  );
};

export default Pagination;
