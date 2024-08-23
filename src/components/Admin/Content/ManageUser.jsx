import ModalCreateUser from "./ModalCreateUser"
import "./ManageUser.scss"
import { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableUser from "./TableUser";
import { getAllUsers, getAllUsersPaginate } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
const ManageUser = () => {
    const LIMIT_USER = 5;
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect( () => {
        //fetchListUsers();
        fetchListUsersPaginate(1)
    }, []);
 
    const fetchListUsers = async () =>{
        let res = await getAllUsers();
        if(res.EC === 0){
            setListUsers(res.DT);
        }
    }

    const fetchListUsersPaginate = async (page) => {
        let res = await getAllUsersPaginate(page, LIMIT_USER);
        if(res.EC === 0){
            setListUsers(res.DT.users);
            //console.log(res.DT);
            setPageCount(res.DT.totalPages);
        }
    }

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        //console.log("user", user);
        setDataUpdate(user);
    }

    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        //console.log(user);
        setDataDelete(user);
    }   

    return(
        <div className="manage-user-container">
            <div className="title">
                ManageUser
            </div>
            <div className="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => setShowModalCreateUser(true)}>Add new Users</button>
                </div>
                <div className="table-users-container">
                    {/* <TableUser  listUsers={listUsers}
                                handleClickBtnUpdate={handleClickBtnUpdate}
                                handleClickBtnDelete={handleClickBtnDelete} /> */}
                    <TableUserPaginate  listUsers={listUsers}
                                handleClickBtnUpdate={handleClickBtnUpdate}
                                handleClickBtnDelete={handleClickBtnDelete} 
                                fetchListUsersPaginate={fetchListUsersPaginate}
                                pageCount={pageCount}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}/>
                </div>
                <ModalCreateUser 
                    show={showModalCreateUser} 
                    setShow={setShowModalCreateUser} 
                    fetchListUsers={fetchListUsers}
                    fetchListUsersPaginate={fetchListUsersPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}/>
                <ModalUpdateUser
                    show={showModalUpdateUser} 
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUsers={fetchListUsers}
                    fetchListUsersPaginate={fetchListUsersPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}/>
                <ModalDeleteUser
                    show={showModalDeleteUser} 
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUsers={fetchListUsers}
                    fetchListUsersPaginate={fetchListUsersPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    />
            </div>
        </div>
    )
}

export default ManageUser