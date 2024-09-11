import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getQuestionByQuizId, getQuizByParticipant, submitAnswes } from "../../services/apiService";
import './DetailQuiz.scss'
import _ from "lodash"
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";

const DetailQuiz = () => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [listQuestion, setListQuestion] = useState([]);
    const [showModalResult, setShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});

    const handleNext = () => {
        if(currentQuestion < listQuestion.length - 1){
            setCurrentQuestion(currentQuestion + 1);
        }
        
        
    }

    const handlePrev = () => {
        if(currentQuestion > 0){
            setCurrentQuestion(currentQuestion - 1);
        }
        
    }

    const handleSubmit = async () => {
        let payload = {
            quizId : +quizId,
            answers : []
        }
        let answers = [];
        //console.log(listQuestion);

        listQuestion.forEach(question => {
            let questionId = +question.idQuestion;
            let answerId = [];
            question.answers.forEach(answer => {
                if(answer.isChecked === true){
                    answerId.push(+answer.id);
                }
            });

            answers.push({
                questionId : questionId,
                userAnswerId: answerId
            });
        });

        payload.answers = answers;
        setShowModalResult(true);

        const res = await submitAnswes(payload);
        if(res && res.EC === 0){
            setDataModalResult(res.DT);
            console.log(dataModalResult);
        }
    }

    useEffect(() => {
        fetchListQuestion();
        
    }, [quizId]);

    const fetchListQuestion = async () => {
        const data = await getQuestionByQuizId(quizId);
        if(data && data.EC === 0){
            //console.log(data);
            const raw = data.DT;
            const res = _.chain(raw)
            // Group the elements of Array based on `color` property
            .groupBy("id")
            // `key` is group's name (color), `value` is the array of objects
            .map((value, key) => {
                //console.log("key ", key, "value ", value);
                let answers = [];
                let questionDescription , image = null;
                value.forEach((item, index) => {
                    if(index === 0){
                        questionDescription = item.description;
                        image = item.image;
                    }
                    item.answers.isChecked = false;
                    
                    //console.log(item);
                    answers.push(item.answers);
                })
                return { idQuestion: key, answers, questionDescription, image }
            }
            )
            .value();

            setListQuestion(res);
            //console.log(res);
        }
        
    }

    const handleCheckBox = (questionId, answerId) => {
        // console.log(questionId, answerId);
        let listQuestionClone = _.cloneDeep(listQuestion);
        // console.log(+questionId, +answerId);
        let question = listQuestionClone.find(item => +item.idQuestion === +questionId);
        if(question && question.answers){
            question.answers = question.answers.map((item) => {
                if(+item.id === answerId){
                    item.isChecked = !item.isChecked;
                }
                return item;
            })
        }
        //console.log(question);
        const index = listQuestionClone.findIndex(item => +item.idQuestion === +questionId);
        if(index > -1){
            listQuestionClone[index] = question;
            setListQuestion(listQuestionClone);
        }

        
    }

    return(
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="quiz-title">
                    {location.state.quizTitle}
                </div>
                <div className="q-content">
                    <Question 
                        currentQuestion={listQuestion && listQuestion.length > 0 ? listQuestion[currentQuestion] : []}
                        handleCheckBox={handleCheckBox}
                    />
                </div>
                <div className="footer">
                    <button className="btn btn-primary" onClick={handlePrev}>Prev</button>
                    <button className="btn btn-secondary" onClick={handleNext}>Next</button>
                    <button className="btn btn-warning" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            <div className="right-content">
                <RightContent
                    listQuestion={listQuestion}
                    handleSubmit={handleSubmit}
                    setCurrentQuestion={setCurrentQuestion}
                />
            </div>
            <ModalResult
                show={showModalResult}
                setShow={setShowModalResult}
                dataModalResult={dataModalResult}/>
        </div>
    )
}

export default DetailQuiz;