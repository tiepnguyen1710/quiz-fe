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
export { postCreateUser, getAllUsers, putUpdateUser, deleteUser , getAllUsersPaginate, loginPost, registerPost};