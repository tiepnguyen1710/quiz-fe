import ModalCreateUser from "./ModalCreateUser"
import "./ManageUser.scss"
const ManageUser = () => {
    return(
        <div className="manage-user-container">
            <div className="title">
                ManageUser
            </div>
            <div className="users-content">
                <div>
                    <button>Add new Users</button>
                </div>
                <div>
            
                </div>
                <ModalCreateUser/>
            </div>
        </div>
    )
}

export default ManageUser