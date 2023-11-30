import axios from "./customize-axios";

const fetchGetAllArticle = (pageNumber, pageSize) => {
    return axios.get(`api/articles?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}

const fetchGetAllArticleAllStatus = (pageNumber, pageSize, s = "") => {
    return axios.get(`api/articles/all-status?searchKey=${s}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
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
// const changeArticle = (id, payload) => {
//     const formData = new FormData();
//     formData.append('Title', payload.title);
//     formData.append('Description', payload.description);
//     formData.append('Image', payload.articleImage);
//     formData.append('Status', payload.status);
//     formData.append('UserID', payload.userID);
//     formData.append('CategoryID', payload.categoryID);

//     return axios.put(`api/articles/${id}`, formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data',
//         },
//     });
// }
const changeArticleStatus = (id, payload) => {
    return axios.put(`api/articles/status/${id}`, {StatusCode : payload.status})
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
    fetchGetTop3FavouriteByUserID,
    changeArticleStatus,
    fetchGetAllArticleAllStatus
};