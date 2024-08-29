import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getQuestionByQuizId, getQuizByParticipant } from "../../services/apiService";
import './DetailQuiz.scss'
import _ from "lodash"
import Question from "./Question";

const DetailQuiz = () => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;
    //console.log(location);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [listQuestion, setListQuestion] = useState([]);

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
    useEffect(() => {
        fetchListQuestion();
        
    }, [quizId]);

    const fetchListQuestion = async () => {
        const data = await getQuestionByQuizId(quizId);
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
                //console.log(item);
                answers.push(item.answers);
            })
            return { idQuestion: key, answers, questionDescription, image }
        }
        )
        .value()

        setListQuestion(res);
        //console.log(res);
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
                        
                    />
                </div>
                <div className="footer">
                    <button className="btn btn-primary" onClick={handlePrev}>Prev</button>
                    <button className="btn btn-secondary" onClick={handleNext}>Next</button>
                </div>
            </div>
            <div className="right-content">

            </div>
        </div>
    )
}

export default DetailQuiz;