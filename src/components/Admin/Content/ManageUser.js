import ModalCreateUser from "./ModalCreateUser"
import "./ManageUser.scss"
import { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableUser from "./TableUser";
import { getAllUsers } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
const ManageUser = () => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [dataUpdate, setDataUpdate] = useState({});

    useEffect( () => {
        fetchListUsers();
    }, []);
 
    const fetchListUsers = async () =>{
        let res = await getAllUsers();
        if(res.EC === 0){
            setListUsers(res.DT);
        }
    }

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        //console.log("user", user);
        setDataUpdate(user);
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
                    <TableUser  listUsers={listUsers}
                                handleClickBtnUpdate={handleClickBtnUpdate} />
                </div>
                <ModalCreateUser 
                    show={showModalCreateUser} 
                    setShow={setShowModalCreateUser} 
                    fetchListUsers={fetchListUsers}/>
                <ModalUpdateUser
                    show={showModalUpdateUser} 
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUsers={fetchListUsers}/>
            </div>
            <ToastContainer
                position="top-right"
                //autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
                {/* Same as */}
            <ToastContainer />
        </div>
    )
}

export default ManageUser