import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

const ModalResult = (props) => {
    const {show, setShow, dataModalResult} = props;

    const handleClose = () => setShow(false);
    
    
  
    return (
      <>
        {/* <Button variant="primary" onClick={handleShow}>
          Confirm delete
        </Button> */}
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Your result</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>Tổng số câu hỏi: <b>{dataModalResult.countTotal}</b></div>
            <div>Tổng số câu trả lời đúng: <b>{dataModalResult.countCorrect}</b></div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default ModalResult;