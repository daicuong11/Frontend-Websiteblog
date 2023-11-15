import axios from "./customize-axios";

const fetchGetAllCategory = () => {
    return axios.get(`api/Categorys?pageNumber=1&pageSize=2&sortOrder=ID`);
}

export { fetchGetAllCategory };