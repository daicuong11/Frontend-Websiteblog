import axios from "./customize-axios";

const fetchGetAllArticle = (pageNumber, pageSize) => {
    return axios.get(`api/articles?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}

const fetchGetAllArticleLatest = (pageNumber, pageSize) => {
    return axios.get(`api/articles/latest?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}

const fetchGetAllArticleFavourite = (pageNumber, pageSize) => {
    return axios.get(`api/articles/favourite?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}

const fetchGetAllArticleOthers = (pageNumber, pageSize) => {
    return axios.get(`api/articles/others?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}

const fetchGetArticleById = (id) => {
    return axios.get(`api/articles/${id}`);
}

const fetchGetAllArticleByCategoryID = (id, pageNumber, pageSize) => {
    return axios.get(`api/articles/category/${id}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}

const fetchGetAllArticleByUserID = (id, pageNumber, pageSize) => {
    return axios.get(`api/articles/user/${id}`);
}

const fetchGetTop3FavouriteByUserID = (id) => {
    return axios.get(`api/articles/favourite/top3?id=${id}`);
}

const fetchCreateNewArticle = (title, description, articleImage, status, userID, categoryID) => {
    const formData = new FormData();
    formData.append('Title', title);
    formData.append('Description', description);
    formData.append('Image', articleImage);
    formData.append('Status', status);
    formData.append('UserID', userID);
    formData.append('CategoryID', categoryID);

    return axios.post(`api/articles`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

const fetchSearchArticleBySearchKey = (searchKey) => {
    return axios.get(`api/articles/search?searchKey=${searchKey}`);
}


export {
    fetchGetAllArticle,
    fetchGetAllArticleByCategoryID,
    fetchGetArticleById,
    fetchGetAllArticleByUserID,
    fetchCreateNewArticle,
    fetchSearchArticleBySearchKey,
    fetchGetAllArticleLatest,
    fetchGetAllArticleFavourite,
    fetchGetAllArticleOthers,
    fetchGetTop3FavouriteByUserID
};