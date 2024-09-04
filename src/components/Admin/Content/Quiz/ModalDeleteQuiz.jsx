import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';

const ModalDeleteQuiz = (props) => {
    const {show, setShow, dataDelete} = props;
    //console.log('delete' , dataDelete);

    const handleClose = () => setShow(false);
    
    const handleDeleteQuiz = async () => {
        const data = await deleteQuiz(dataDelete.id);
        if(data && data.EC === 0){
            toast.success(data.EM);
            handleClose();
            //props.setCurrentPage(1);
            props.fetchListQuiz();

        if(data.EC !== 0){
            toast.error(data.EM);
            
        } 
    }
}
    //console.log("chạy vào đây");
  
    return (
      <>
        {/* <Button variant="primary" onClick={handleShow}>
          Confirm delete
        </Button> */}
  
        <Modal show={show} onHide={handleClose} backdrop='static' className='modal-delete-quiz'>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you confirm to delete this quiz, Id : <b>{dataDelete.id}</b></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleDeleteQuiz}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default ModalDeleteQuiz