import { useState } from 'react'
import './QuizManage.scss'
import Select from 'react-select'
import { postCreateQuiz } from '../../../../services/apiService'
import { toast } from 'react-toastify'

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

    const handleChangeFile = (event) => {
        if(event.target && event.target.files && event.target.files[0]){
            setImage(event.target.files[0]);
        }
    }

    const handleBtnSave = async () => {
        if(!name || !description){
            toast.error("Invalid");
        }
        const res = await postCreateQuiz(description, name, type?.value, image);

        if(res && res.EC === 0){
            toast.success(res.EM);
        }

        if(res && res.EC !== 0){
            toast.error(res.EM);
        }
    }

    return (
        <div className="quiz-manage-container">
            <div className="title">
                Quiz Manage
            </div>
            <div className="add-new my-3">
                <fieldset className='border rounded-3 p-3'>
                    <legend className='float-none w-auto px-3'>Add new quiz</legend>
                    <div className="form-floating mb-3 ">
                        <input type="text" className="form-control" placeholder="" 
                            value={name}
                            onChange={(event) => setName(event.target.value)}/>
                        <label >Name</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" placeholder="" 
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}/>
                        <label >Description</label>
                    </div>
                    <div className='select-quiz mt-3'>
                        <Select defaultValue={type} onChange={setType} options={options} />
                    </div>
                    <div className='upload-file mt-4'>
                        <input type="file" className='form-control' onChange={(event) => handleChangeFile(event)}/>
                    </div>
                    <div className='btn-save mt-3'>
                        <button className='btn btn-primary' onClick={handleBtnSave}>Save</button>
                    </div>

                </fieldset>
            </div>
            <div className="table-quiz">
                table
            </div>
        </div>
    )
}

export default QuizManage