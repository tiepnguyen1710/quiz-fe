import Select from "react-select"
import './QuestionsManage.scss'
import { IoIosAddCircle } from "react-icons/io";
import { FaMinusCircle } from "react-icons/fa";
const QuestionsManage = () => {
    const options = [
        { value: 'Easy', label: 'Easy' },
        { value: 'Normal', label: 'Normal' },
        { value: 'Hard', label: 'Hard' }
    ]
    return (
        <div className="question-answer-container">
            <div className="title">
                Question Management
            </div>
            <div className="select-quiz my-3">
                <div className="label-select">
                    Select Quiz
                </div>
                <div className="select-type col-6">
                    <Select options={options} />
                </div>
            </div>
            <div className="form-question">
                <div className="question-des">
                    <label htmlFor="">Add question</label>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder=""/>
                         <label for="floatingInput">Description</label>
                    </div>
                </div>
                <div className="upload-image">
                    <label className='label-upload' htmlFor="question-img">Upload Image</label>
                    <input type="file" hidden id="question-img"/>
                    <span>0 file is chosen</span>
                </div>
                <div className="add-new">
                    <span className="btn-question-add">
                        <IoIosAddCircle color="green"/>
                    </span>
                    <span className="btn-question-del">
                        <FaMinusCircle color="red"/>
                    </span>
                </div>
            </div>
            <div className="form-answer">
                <input type="checkbox" className="form-check-input"/>
                <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder=""/>
                         <label for="floatingInput">Answer 1</label>
                </div>
                <div className="add-new">
                    <span className="btn-question-add">
                        <IoIosAddCircle color="green"/>
                    </span>
                    <span className="btn-question-del">
                        <FaMinusCircle color="red"/>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default QuestionsManage