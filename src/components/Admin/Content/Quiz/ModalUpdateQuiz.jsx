import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoIosPersonAdd } from "react-icons/io";
import { toast } from 'react-toastify';
import _ from 'lodash';
import Select from 'react-select'
import { putUpdateQuiz } from '../../../../services/apiService';

const ModalUpdateQuiz = (props) => {
    const {show, setShow, dataUpdate, options} = props; 

  const handleClose = () => {
    setShow(false)
    // setEmail("")
    // setUsername("")
    // setPassword("")
    // setRole("USER")
    // setImagePreview("")
    // setImage("")

  };


  //const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  
  useEffect(() => {
    //console.log("UseEffect", dataUpdate);
    if(!_.isEmpty(dataUpdate)){
        setName(dataUpdate.name);
        setDescription(dataUpdate.description);
        setType(dataUpdate.difficulty);
        setImage("");
        setImagePreview(`data:image/jpeg;base64,${dataUpdate.image}`);
    }
  },[dataUpdate]);
  
  const handleUploadFile = (event) => {
    if(event.target && event.target.files && event.target.files[0]){
      setImagePreview(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
    else{
      console.log("nothing");
    }
    
  }

  const handleSubmitCreateUser = async () => {

    const data = await putUpdateQuiz(dataUpdate.id, description, name, type?.value, image);
    //console.log(data);

    if(data && data.EC === 0){
      toast.success(data.EM);
      handleClose();
      await props.fetchListQuiz();
    }
    
    if(data.EC !== 0){
      toast.error(data.EM);
    }
  }

  //console.log("Render", dataUpdate);
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Add new user
      </Button> */}

      <Modal show={show} onHide={handleClose} size='xl' backdrop='static' className='modal-add-user'>
        <Modal.Header closeButton>
          <Modal.Title>Update user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Name</label>
                    <input  type="texy" className="form-control" 
                            onChange={(event) => {setName(event.target.value)}} 
                            value={name}
                            />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Description</label>
                    <input  type="text" className="form-control" 
                            onChange={(event) => {setDescription(event.target.value)}} 
                            value={description}
                            />
                </div>
                <div className='select-quiz mt-3 col-md-6'>
                    <Select defaultValue={type} onChange={setType} options={options} />
                </div>
                <div className='col-md-12'>
                    <label className="form-label label-upload" htmlFor='your-image-id'>
                    <IoIosPersonAdd/> Upload file image
                    </label>
                    <input  type='file' hidden id='your-image-id'    
                            onChange={(event) => handleUploadFile(event)}/>
                </div>
                <div className='col-md-12 img-preview'>
                    {imagePreview ? <img src={imagePreview}></img> : <span>Image Preview</span>}
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitCreateUser}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}

export default ModalUpdateQuiz