import ModalCreateUser from "./ModalCreateUser"
import "./ManageUser.scss"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ManageUser = () => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)

    return(
        <div className="manage-user-container">
            <div className="title">
                ManageUser
            </div>
            <div className="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => setShowModalCreateUser(true)}>Add new Users</button>
                </div>
                <div>

                </div>
                <ModalCreateUser show={showModalCreateUser} setShow={setShowModalCreateUser}/>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
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