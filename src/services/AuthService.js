import axios from "./customize-axios";

//call api
const fetchGetUserByJWT = () => {
    return axios.get(`api/token/info`)
}

export { fetchGetUserByJWT };