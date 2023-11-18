import axios from "./customize-axios";

const fetchGetAllArticle = (pageNumber, pageSize) => {
    return axios.get(`api/articles?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}

const fetchGetAllArticleByCategoryID = (id) => {
    return axios.get(`api/articles/category/${id}`);
}

export { fetchGetAllArticle, fetchGetAllArticleByCategoryID };