import axios from "./customize-axios";

//call api
const fetchRegister = (name, username, password, role) => {
    return axios.post('api/user/register', { name, username, password, role });
}

const fetchLogin = (username, password) => {
    return axios.post('api/token', { username, password });
}

const fetchGetUserByJWT = () => {
    return axios.get(`api/token/info`)
}

const fetchChangePassword = (id, password) => {
    return axios.put(`api/user/change-password/${id}`, { password });
}

export {
    fetchGetUserByJWT,
    fetchLogin,
    fetchRegister,
    fetchChangePassword
};