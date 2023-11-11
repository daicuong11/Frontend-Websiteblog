import axios from "./customize-axios";

const fetchGetAll = () => {
    return axios.get(`api/user`);
}

export { fetchGetAll };