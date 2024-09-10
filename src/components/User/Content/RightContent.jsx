import './RightContent.scss'
import TimeCountDown from './TimeCountDown';

const RightContent = (props) => {
    const { listQuestion } = props;
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
                        <div className="question">{index + 1}</div>
                    )
                })
                }
                
                
            </div>
        </>
    )
}

export default RightContent