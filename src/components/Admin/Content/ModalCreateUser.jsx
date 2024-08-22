import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoIosPersonAdd } from "react-icons/io";
import { toast } from 'react-toastify';
import {postCreateUser} from '../../../services/apiService';

const ModalCreateUser = (props) => {
  const {show, setShow} = props; 

  const handleClose = () => {
    setShow(false)
    setEmail("")
    setUsername("")
    setPassword("")
    setRole("USER")
    setImagePreview("")
    setImage("")

  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //const handleShow = () => setShow(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  
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
    const isValidEmail = validateEmail(email);
    if(!isValidEmail){
      toast.error("Email invalid");
      return;
    }

    if(!password){
      toast.error("Password invalid");
      return;
    }

    const data = await postCreateUser(email, username, password, role, image);
    //console.log(data);

    if(data && data.EC === 0){
      toast.success(data.EM);
      handleClose();
      props.setCurrentPage(1);
      await props.fetchListUsersPaginate(1);
    }
    
    if(data.EC !== 0){
      toast.error(data.EM);
    }
  }

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Add new user
      </Button> */}

      <Modal show={show} onHide={handleClose} size='xl' backdrop='static' className='modal-add-user'>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input  type="email" className="form-control" 
                            onChange={(event) => {setEmail(event.target.value)}} 
                            value={email}/>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Password</label>
                    <input  type="password" className="form-control" 
                            onChange={(event) => {setPassword(event.target.value)}} 
                            value={password}/>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Username</label>
                    <input  type="text" className="form-control" 
                            onChange={(event) => {setUsername(event.target.value)}} 
                            value={username}/>
                </div>
                <div className="col-md-4">
                    <label className="form-label">Role</label>
                    <select className="form-select" 
                            onChange={(event) => {setRole(event.target.value)}} 
                            value={role}>
                    <option value="USER">User</option>
                    <option value='ADMIN'>Admin</option>
                    </select>
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

export default ModalCreateUser;