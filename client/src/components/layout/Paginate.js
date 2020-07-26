import React from "react";

const Paginate = ({ pageNum, page }) => {
  let pageA = [];
  for (let i = 1; i <= pageNum; i++) {
    pageA.push(i);
  }
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          {pageA.map((num) => (
            <li class="page-item">
              <a class="page-link" href="#" onChange={page}>
                {num}
              </a>
              LOL
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   page: state.propertyReducer.page,
// });connect(null, {})

export default Paginate;
