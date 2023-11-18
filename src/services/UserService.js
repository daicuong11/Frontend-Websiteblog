import axios from "./customize-axios";

const fetchGetAll = () => {
    return axios.get(`api/user`);
}

const fetchGetUserById = (id) => {
    return axios.get(`api/user/${id}`);
}

export { fetchGetAll, fetchGetUserById};