import { useEffect, useState } from "react";
import { getQuizByParticipant } from "../../services/apiService";
import "./ListQuiz.scss"
import { useNavigate } from "react-router-dom";
const ListQuiz = () => {
    const navigate = useNavigate();
    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        fetchListQuiz();
    }, []);

    const fetchListQuiz = async () => {
        const data = await getQuizByParticipant();

        if (data && data.EC === 0) {
            setListQuiz(data.DT);
            //console.log(data.DT);
        }
    }

    return (
        <div className="list-quiz-container container">
     
                {listQuiz && listQuiz.length > 0 &&
                    listQuiz.map((item, index) => {
                        return (
                            <div key={index} className="card" style={{ width: "18rem" }}>
                                <img className="card-img-top" src={`data:image/jpeg;base64,${item.image}`} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{`Quiz ${item.id}`}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <a className="btn btn-primary" onClick={() => {navigate(`/quiz/${item.id}`, { state: { quizTitle : item.description} })}}>Start</a>
                                </div>
                            </div>
                        )
                    })}
        </div>
    )
}

export default ListQuiz;