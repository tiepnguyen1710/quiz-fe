import Select from "react-select"
import './QuestionsManage.scss'
import { IoIosAddCircle } from "react-icons/io";
import { FaMinusCircle } from "react-icons/fa";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'

const QuestionsManage = () => {
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'NORMAL', label: 'NORMAL' },
        { value: 'HARD', label: 'HARD' }
    ]
    const [selectQuestion, setSelectedQuestion] = useState({});
    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
        ]
    )

    const handleAddRemoveQuestion = (type, questionId) => {
        if(type === 'ADD'){
            let questionsClone = _.cloneDeep(questions);
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            };

            setQuestions([...questionsClone, newQuestion]);
        }

        if(type === 'REMOVE'){
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter(item => item.id !== questionId);
            setQuestions(questionsClone);
        }
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        if(type === 'ADD'){
            let questionsClone = _.cloneDeep(questions);
            let newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }

            let index = questionsClone.findIndex(item => item.id === questionId)
            questionsClone[index].answers = [...questionsClone[index].answers, newAnswer];
            setQuestions(questionsClone);
        }

        if(type === 'REMOVE'){
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId);
            setQuestions(questionsClone);
        }
    }

    const handleOnChangeQuestion = (questionId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        console.log(questionId);
        if(index > -1){
            questionsClone[index].description = value;
        }
        setQuestions(questionsClone);
    }

    const handleOnChangeImage = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        console.log(questionId, index);
        if(index > -1 && event.target && event.target.files && event.target.files[0]){
                questionsClone[index].imageFile = event.target.files[0];
                questionsClone[index].imageName = event.target.files[0].name;
        }
        setQuestions(questionsClone);
    }

    const handleOnChangeAnswer = (type, questionId, answerId, value) => {
        
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex(item => item.id === questionId);
            //console.log(questionsClone[index].id);
            if(index > -1){
                questionsClone[index].answers = questionsClone[index].answers.map((answer, index) => {
                    if(answer.id === answerId){
                        if(type === 'DESCRIPTION'){
                            //console.log(questionId, answerId, value);
                            answer.description = value;
                            console.log(answer.description);
                        }
                        
                        if(type === 'CHECKBOX'){
                            answer.isCorrect = value;
                        }
                    }
                    return answer;
                })
            }
            setQuestions(questionsClone);
    }

    const handleBtnSubmit = () => {
        console.log(questions);
    }

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
                    <Select options={options} defaultValue={selectQuestion} onChange={setSelectedQuestion} />
                </div>
            </div>

            {questions && questions.length > 0 &&
                questions.map((question, index) => {
                    return (
                        <div key={question.id} className="q-main">
                            <div className="form-question">
                                <div className="question-des">
                                    <label htmlFor="">Add question</label>
                                    <div className="form-floating mb-3">
                                        <input type="text" 
                                                className="form-control" 
                                                placeholder="" 
                                                value={question.description} 
                                                onChange={(event) => {handleOnChangeQuestion(question.id, event.target.value)}}/>
                                        <label for="floatingInput">Question {index + 1} Description</label>
                                    </div>
                                </div>
                                <div className="upload-image">
                                    <label className='label-upload' htmlFor={`question-img-${index}`}>Upload Image</label>
                                    <input type="file" hidden id={`question-img-${index}`} 
                                            onChange={(event) => {handleOnChangeImage(question.id, event)}}/>
                                    {question.imageName ? <span>{question.imageName}</span> : <span>0 file is chosen</span>}
                                    
                                </div>
                                <div className="add-new">
                                    <span className="btn-question-add">
                                        <IoIosAddCircle color="green" onClick={() => handleAddRemoveQuestion('ADD')}/>
                                    </span>
                                    {questions.length > 1 &&
                                    <span className="btn-question-del" onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                    <FaMinusCircle color="red" />
                                    </span>
                                    }
                                    
                                </div>
                            </div>

                            {question.answers && question.answers.length > 0 &&
                                question.answers.map((answer, index) => {
                                    return (
                                        <div key={ answer.id} className="form-answer">
                                            <input type="checkbox" 
                                            className="form-check-input" 
                                            value={answer.isCorrect}
                                            onChange={(event) => handleOnChangeAnswer('CHECKBOX', question.id, answer.id, event.target.checked)}/>
                                            <div className="form-floating mb-3">
                                                <input type="text" 
                                                        className="form-control" 
                                                        placeholder="" 
                                                        value={answer.description}
                                                        onChange={(event) => {handleOnChangeAnswer('DESCRIPTION', question.id, answer.id, event.target.value)}}/>
                                                <label for="floatingInput">Answer {index + 1} </label>
                                            </div>
                                            <div className="add-new">
                                                <span className="btn-question-add">
                                                    <IoIosAddCircle color="green" onClick={() => handleAddRemoveAnswer('ADD', question.id)}/>
                                                </span>
                                                {question.answers.length > 1 &&
                                                    <span className="btn-question-del">
                                                    <FaMinusCircle color="red" onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}/>
                                                    </span>
                                                }
                                                
                                            </div>
                                        </div>
                                    )
                                }
                                )}
                        </div>
                    )
                }
                )}

            <div className="submit-question mt-5">
                <button className="btn btn-warning" onClick={handleBtnSubmit}>Save</button>
            </div>

        </div>
    )
}

export default QuestionsManage