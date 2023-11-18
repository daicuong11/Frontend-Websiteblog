import axios from "./customize-axios";

const fetchGetAllArticle = () => {
    return axios.get(`api/articles`);
}

export { fetchGetAllArticle };