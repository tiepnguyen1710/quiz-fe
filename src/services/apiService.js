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


export { postCreateUser, getAllUsers };