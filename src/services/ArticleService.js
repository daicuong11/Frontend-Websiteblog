import axios from "./customize-axios";

const fetchGetAllArticle = (pageNumber, pageSize) => {
    return axios.get(`api/articles?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}

const fetchGetArticleById = (id) => {
    return axios.get(`api/articles/${id}`);
}

const fetchGetAllArticleByCategoryID = (id, pageNumber, pageSize) => {
    return axios.get(`api/articles/category/${id}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}

export { fetchGetAllArticle, fetchGetAllArticleByCategoryID, fetchGetArticleById };