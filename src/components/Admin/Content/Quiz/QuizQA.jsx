import Select from "react-select"
import './QuizQA.scss'
import { IoIosAddCircle } from "react-icons/io";
import { FaMinusCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { getAllQuiz, getQuizWithQA, postCreateAnswerForQuestion, postCreateQuestionForQuiz, postUpSertQA } from "../../../../services/apiService";
import _ from 'lodash'
import { toast } from 'react-toastify';

const QuizQA = () => {
    const initQuestion = [
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
    const [selectQuiz, setSelectedQuiz] = useState({});
    const [listQuiz, setListQuiz] = useState([]);
    const [questions, setQuestions] = useState(initQuestion);

    useEffect(() => {

        fetchListQuiz();

    }, []);

    useEffect(() => {
        if(selectQuiz && selectQuiz.value)
            fetchQuizWithQA();

    }, [selectQuiz])

    const fetchListQuiz = async () => {

        const res = await getAllQuiz();
        //console.log(res.DT);

        if (res && res.EC === 0) {
            let newQuiz = res.DT.map((quiz) => {
                return(
                    {
                        value: quiz.id,
                        label: quiz.name
                    }
                )
            })
            setListQuiz(newQuiz);
        }

    }

    function urltoFile(url, filename, mimeType){
        return (fetch(url)
                .then(function(res){return res.arrayBuffer();})
                .then(function(buf){return new File([buf], filename, {type:mimeType});})
        );
    }

    const fetchQuizWithQA = async () => {
        const res = await getQuizWithQA(selectQuiz.value);
        if(res && res.EC === 0){
            //console.log(res.DT.qa);
            let newQA = [];
            for(let i = 0; i < res.DT.qa.length; i++){
                let q = res.DT.qa[i];
                if(q.imageFile){
                    q.imageName = `Question-${q.id}.png`;
                    q.imageFile = await urltoFile(`data:image/png;base64,${q.imageFile}`,  `Question-${q.id}.png`,'image/png');
                }
                newQA.push(q);
            }
            setQuestions(newQA);
        }
    }

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
        //console.log(questionId);
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
                            //console.log(answer.description);
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

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    const handleBtnSubmit = async () => {
        // await Promise.all(questions.map( async (question) => {
        //     const q = await postCreateQuestionForQuiz(
        //         +selectQuiz.value,
        //         question.description,
        //         question.imageFile
        //     );
        //     await Promise.all(question.answers.map( async (answer) => {
        //         await postCreateAnswerForQuestion(
        //             answer.description,
        //             answer.isCorrect,
        //             q.DT.id
        //         )
        //     })) 
        // }))
        if(_.isEmpty(selectQuiz)){
            toast.error('Please choose a quiz');
            return;
        }

        //validate answer
        let isValidAnswer = true;
        let indexQ = 0, indexA = 0;
        for(let i = 0; i < questions.length; i++){
            for(let j = 0; j < questions[i].answers.length; j++){
                if(!questions[i].answers[j].description){
                    isValidAnswer = false;
                    indexA = j;
                    break;
                }
            }
            indexQ = i;
            if(isValidAnswer === false)
                break;
        }
        if(isValidAnswer === false){
            toast.error(`Please fill out answer ${indexA + 1} of question ${indexQ + 1}`);
            return;
        }

        //validate question
        let isValidQuestion = true;
        for(let i = 0; i < questions.length; i++){
            if(!questions[i].description){
                isValidQuestion = false;
                indexQ = i;
                break;
            }
        }
        if(isValidQuestion === false){
            toast.error(`Please fill out question ${indexQ + 1}`);
            return;
        }


        let questionClone = _.cloneDeep(questions);
        for(let i = 0; i < questionClone.length; i++){
            if(questionClone[i].imageFile){
                console.log(typeof(questionClone[i].imageFile))
                questionClone[i].imageFile = await toBase64(questionClone[i].imageFile);
            }
        }

        console.log("questonCLone", questionClone);

        let res = await postUpSertQA({
            quizId: selectQuiz.value,
            questions: questionClone

        });

        if(res && res.EC === 0){
            toast.success(res.EM);
            fetchQuizWithQA();
        }
        
    }

    console.log('question:', questions)

    return (
        <div className="question-answer-container">
            <div className="select-quiz mb-3">
                <div className="label-select">
                    Select Quiz
                </div>
                <div className="select-type col-6" style={{zIndex : 2}}>
                    <Select options={listQuiz} defaultValue={selectQuiz} onChange={setSelectedQuiz} />
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
                                        <div key={ answer.id } className="form-answer">
                                            <input type="checkbox" 
                                            className="form-check-input" 
                                            checked={answer.isCorrect}
                                            onChange={(event) => handleOnChangeAnswer('CHECKBOX', question.id, answer.id, event.target.checked)}/>
                                            <div className="form-floating mb-3">
                                                <input type="text" 
                                                        className="form-control" 
                                                        placeholder="" 
                                                        value={answer.description}
                                                        onChange={(event) => {handleOnChangeAnswer('DESCRIPTION', question.id, answer.id, event.target.value)}}/>
                                                <label for="floatingInput" style={{zIndex : 1}}>Answer {index + 1} </label>
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

export default QuizQA