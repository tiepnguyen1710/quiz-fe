import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuestionByQuizId, getQuizByParticipant } from "../../services/apiService";

const DetailQuiz = () => {
    const params = useParams();
    const quizId = params.id;
    useEffect(() => {
        fetchListQuestion();
    }, [quizId]);

    const fetchListQuestion = async () => {
        const data = await getQuestionByQuizId(quizId);
        console.log(data);
    }
    return(
        <div>
            Detail Quiz
        </div>
    )
}

export default DetailQuiz;