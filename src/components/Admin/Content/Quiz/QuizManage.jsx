import { useState, useEffect } from 'react'
import './QuizManage.scss'
import Select from 'react-select'
import { postCreateQuiz } from '../../../../services/apiService'
import { toast } from 'react-toastify'
import TableQuiz from './TableQuiz'
import Accordion from 'react-bootstrap/Accordion';
import ModalUpdateQuiz from './ModalUpdateQuiz'
import { getAllQuiz } from '../../../../services/apiService'
import ModalDeleteQuiz from './ModalDeleteQuiz'

const options = [
    { value: 'Easy', label: 'Easy' },
    { value: 'Normal', label: 'Normal' },
    { value: 'Hard', label: 'Hard' }
]

const QuizManage = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);
    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
    const [dataDelete, setDataDelete] = useState({});
    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {

        fetchListQuiz();

    }, []);

    const fetchListQuiz = async () => {

        const res = await getAllQuiz();
        console.log(res.DT);

        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }

    }

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    }

    const handleBtnSave = async () => {
        if (!name || !description) {
            toast.error("Invalid");
            return;
        }
        const res = await postCreateQuiz(description, name, type?.value, image);

        if (res && res.EC === 0) {
            setName('');
            setDescription('');
            setType('');
            setImage(null);
            toast.success(res.EM);
        }

        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    }

    const handleBtnUpdate = (quiz) => {
        //console.log(quiz);
        setShowModalUpdateQuiz(true);
        setDataUpdate(quiz)
    }

    const handleBtnDelete = (quiz) => {
        //console.log(typeof(quizId));
        setShowModalDeleteQuiz(true);
        setDataDelete(quiz);
    }

    return (
        <div className="quiz-manage-container">
            {/* <div className="title">
                Quiz Manage
            </div> */}
            <div className='acc-add mb-4'>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Quiz Manage</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new my-3">
                            <fieldset className='border rounded-3 p-3'>
                                <legend className='float-none w-auto px-3'>Add new quiz</legend>
                                <div className="form-floating mb-3 ">
                                    <input type="text" className="form-control" placeholder=""
                                        value={name}
                                        onChange={(event) => setName(event.target.value)} />
                                    <label >Name</label>
                                </div>
                                <div className="form-floating">
                                    <input type="text" className="form-control" placeholder=""
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)} />
                                    <label >Description</label>
                                </div>
                                <div className='select-quiz mt-3'>
                                    <Select defaultValue={type} onChange={setType} options={options} />
                                </div>
                                <div className='upload-file mt-4'>
                                    <input type="file" className='form-control' onChange={(event) => handleChangeFile(event)} />
                                </div>
                                <div className='btn-save mt-3'>
                                    <button className='btn btn-primary' onClick={handleBtnSave}>Save</button>
                                </div>

                            </fieldset>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            </div>
            
            <div className="table-quiz">
                <div className='table-title'>
                    All Quiz
                </div>
                <TableQuiz 
                    handleBtnUpdate={handleBtnUpdate}
                    handleBtnDelete={handleBtnDelete}
                    listQuiz={listQuiz}/>
            </div>
            <ModalDeleteQuiz
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                dataDelete={dataDelete}
                fetchListQuiz={fetchListQuiz}
                />
            <ModalUpdateQuiz
                options={options}
                show={showModalUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                dataUpdate={dataUpdate}
                fetchListQuiz={fetchListQuiz}
                />
            
        </div>
    )
}

export default QuizManage