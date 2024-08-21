import {useEffect, useState} from 'react'
import ReactPaginate from "react-paginate"

const TableUserPaginate = (props) => {
    const {listUsers, fetchListUsersPaginate} = props;
    const {pageCount} = props;

    const handlePageClick = (event) => {
        console.log(`User requested page number ${event.selected}`);
        props.setCurrentPage(+event.selected + 1);
        fetchListUsersPaginate(+event.selected + 1);
      };

    return (
        <div>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                    listUsers.map((item, index) => {
                        return(
                            <tr key={`key: ${index}`}>
                                <td>{index + 1}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>
                                    <button className="btn btn-info">Info</button>
                                    <button className="btn btn-warning mx-3" onClick={() => props.handleClickBtnUpdate(item)}>Update</button>
                                    <button className="btn btn-danger" onClick={() => props.handleClickBtnDelete(item)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })  
                    }
                    
                </tbody>
            </table>
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={props.currentPage - 1}
            />
        </div>
    )

}

export default TableUserPaginate