import _ from "lodash"

const Question = (props) => {
    const { currentQuestion } = props;
    //console.log(currentQuestion);
    if(_.isEmpty(currentQuestion)){
        return(<></>)
    }

    const handleChangeCheckBox = (questionId, answerId ) => {
        // console.log(currentQuestion);
        // console.log(+questionId, answerId);
        props.handleCheckBox(questionId, answerId);
            
        
    }
    return (
        <>
            <>
                <div className="q-title">
                    {currentQuestion.questionDescription}
                </div>
                <div className="q-body">
                    {currentQuestion.image &&
                    <img src={`data:image/jpeg;base64,${currentQuestion.image}`}/>
                    }
                    
                </div>
            
                <div className="answer">
                    {currentQuestion && currentQuestion.answers && currentQuestion.answers.length > 0
                        && currentQuestion.answers.map((item, index) => {
                            return(
                            
                                <div key={index} className="a-child">
                                    <div className="form-check">   
                                        <input type="checkbox" 
                                        className="form-check-input"
                                        checked={item.isChecked}
                                        onChange={(event) => handleChangeCheckBox(currentQuestion.idQuestion, item.id)}/>
                                        <label className="form-check-label">
                                            {item.description}
                                        </label>
                                    </div>
                                </div>
                            )
                            
                        })}

                </div >
              
           
            </>
        </>
    )
}

export default Question;