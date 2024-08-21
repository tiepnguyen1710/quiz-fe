import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../services/apiService';
import { toast } from 'react-toastify';

function ModalDeleteUser(props) {
    const {show, setShow, dataDelete} = props;

    const handleClose = () => setShow(false);
    
    const handleDeleteUser = async () => {
        const data = await deleteUser(dataDelete.id);
        if(data && data.EC === 0){
            toast.success(data.EM);
            handleClose();
            props.setCurrentPage(1);
            props.fetchListUsersPaginate(1);
        }

        if(data.EC !== 0){
            toast.error(data.EM);
            
        } 
    }
  
    return (
      <>
        {/* <Button variant="primary" onClick={handleShow}>
          Confirm delete
        </Button> */}
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you confirm to delete this user, email : <b>{dataDelete.email}</b></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleDeleteUser}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default ModalDeleteUser;