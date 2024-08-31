import { useState } from 'react'
import './QuizManage.scss'
import Select from 'react-select'

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

    return (
        <div className="quiz-manage-container">
            <div className="title">
                Quiz Manage
            </div>
            <div className="add-new my-3">
                <fieldset className='border rounded-3 p-3'>
                    <legend className='float-none w-auto px-3'>Add new quiz</legend>
                    <div class="form-floating mb-3 ">
                        <input type="text" class="form-control" placeholder="" 
                            value={name}
                            onChange={(event) => setName(event.target.value)}/>
                        <label for="floatingInput">Name</label>
                    </div>
                    <div class="form-floating">
                        <input type="text" class="form-control" placeholder="" 
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}/>
                        <label >Description</label>
                    </div>
                    <div className='select-quiz mt-3'>
                        <Select value={type} options={options} />
                    </div>
                    <div className='upload-file mt-4'>
                        <input type="file" className='form-control'/>
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