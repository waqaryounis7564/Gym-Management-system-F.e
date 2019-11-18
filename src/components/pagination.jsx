import React from "react";
import _ from "lodash";

const Pagination = props => {
  let { movies, pageSize, currentPage, onPagination } = props;
  let size = Math.ceil(movies / pageSize);
  if (size === 1) return null;
  let pages = _.range(1, size + 1);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map(pg => (
          <li
            className={currentPage === pg ? "page-item active" : "page-item"}
            key={pg}
          >
            <a className="page-link" href="#" onClick={() => onPagination(pg)}>
              {pg}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
