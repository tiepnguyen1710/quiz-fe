import axios from "../utils/axiosCustomize";

const postCreateUser = (email, username, password, role, image) => {
    const formCreate = new FormData();
    formCreate.append("email", email);
    formCreate.append("username", username);
    formCreate.append("password", password);
    formCreate.append("role", role);
    formCreate.append("userImage", image);
    
    return axios.post("api/v1/participant", formCreate);
}

const getAllUsers = () => {
    return axios.get("api/v1/participant/all");
}

const putUpdateUser = (id, username, role, image) => {
    const formCreate = new FormData();
    formCreate.append("id", id);
    formCreate.append("username", username);
    formCreate.append("role", role);
    formCreate.append("userImage", image);
    
    return axios.put("api/v1/participant", formCreate);
}

const deleteUser = (idUser) => {
    return axios.delete("api/v1/participant", {data : {id : idUser}});
}

const getAllUsersPaginate = (page, limit_item) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit_item}`);
}

const loginPost = (email, password) => {
    return axios.post('api/v1/login', { email, password, delay : 1000});
}
 
const registerPost = (email, username, password) => {
    return axios.post('api/v1/register', {email, username, password});
}

const getQuizByParticipant = () => {
    return axios.get('api/v1/quiz-by-participant');
}

const getQuestionByQuizId = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`)
}

const submitAnswes = (payload) => {
    return axios.post('api/v1/quiz-submit', {...payload});
}

const postCreateQuiz = (description, name,  type, image) => {
    const formCreate = new FormData();
    formCreate.append("description", description);
    formCreate.append("name", name);
    formCreate.append("difficulty", type);
    formCreate.append("quizImage", image);
    
    return axios.post("api/v1/quiz", formCreate);
}

const getAllQuiz = () => {
    return axios.get('api/v1/quiz/all');
}

const putUpdateQuiz = (id, description, name,  type, image) => {
    const formUpdate = new FormData();
    formUpdate.append('id', id);
    formUpdate.append('description', description);
    formUpdate.append('name', name);
    formUpdate.append('difficulty', type);
    formUpdate.append('quizImage', image);

    return axios.put('api/v1/quiz', formUpdate);
}

const deleteQuiz = (quizId) => {
    return axios.delete(`api/v1/quiz/${quizId}`);
}

const postCreateQuestionForQuiz = (quiz_id, description, image) => {
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', image);

    return axios.post('api/v1/question', data);
}

const postCreateAnswerForQuestion = (description, correct_answer, question_id) => {
    return axios.post('api/v1/answer', {
        description, correct_answer, question_id
    });
}

const postAssignQuiz = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', {
        quizId, userId
    })
}

const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);
}

const postUpSertQA = (data) => {
    return axios.post(`api/v1/quiz-upsert-qa`, {...data});
}

export { postCreateUser, getAllUsers, putUpdateUser, deleteUser , 
    getAllUsersPaginate, loginPost, registerPost, getQuizByParticipant, 
    getQuestionByQuizId, submitAnswes, postCreateQuiz, getAllQuiz,
    putUpdateQuiz, deleteQuiz, postCreateQuestionForQuiz, postCreateAnswerForQuestion,
    postAssignQuiz, getQuizWithQA, postUpSertQA};