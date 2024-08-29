import _ from "lodash"

const Question = (props) => {
    const { currentQuestion } = props;
    //console.log(currentQuestion);
    if(_.isEmpty(currentQuestion)){
        return(<></>)
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
                                        <input type="checkbox" className="form-check-input"/>
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