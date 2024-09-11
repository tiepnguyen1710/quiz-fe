import { useRef } from 'react';
import './RightContent.scss'
import TimeCountDown from './TimeCountDown';

const RightContent = (props) => {
    const { listQuestion} = props;
    const refDiv = useRef([]);

    const handleSelectQuestion = (question, index) => {
        props.setCurrentQuestion(index);
        if(refDiv.current){
            refDiv.current.forEach((item) => {
                if(item.className === "question clicked")
                    item.className = "question"
            })
        }

        if(question && question.answers.length > 0){
            const isAnswered = question.answers.find(item => item.isChecked === true);
            if(isAnswered){
                return;
            }
        }


        refDiv.current[index].className = "question clicked";
        
    }
    //console.log(listQuestion);
    const setClassQuestion = (question) => {
        if(question && question.answers.length > 0){
            const isAnswered = question.answers.find(item => item.isChecked === true);
            if(isAnswered){
                return "question selected";
            }
        }

        return "question";
    }

    return(
        <>
            <div className="time-countdown">
                <TimeCountDown
                    handleSubmit={props.handleSubmit}
                />
            </div>
            <div className="main-question">

                {listQuestion && listQuestion.length > 0 &&

                listQuestion.map((question, index) => {
                    return(
                        <div 
                        key={`question-${index}`}
                        className={setClassQuestion(question)}
                        onClick={() => handleSelectQuestion(question, index)}
                        ref={element => refDiv.current[index] = element}>
                            {index + 1}
                        </div>
                    )
                })
                }
                
                
            </div>
        </>
    )
}

export default RightContent