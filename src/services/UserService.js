import axios from "./customize-axios";

const fetchGetAll = (keyword = "", page = 1, size = 5, sortKey = "id") => {
    return axios.get(`api/user/search?s=${keyword}&pageNumber=${page}&pageSize=${size}&sortOrder=${sortKey}`);
}
const fetchGetUserById = (id) => {
    return axios.get(`api/user/${id}`);
}
const createUser = (payload) => {
    return axios.post(`api/user`, payload);
}
const changeInfUser = (id, payload) => {
    return axios.put(`api/user/${id}`, payload);
}
const deleteUser = async (id) => {
    return await axios.delete(`api/user/${id}`);
}
const lockUser = async (id) => {
    return await axios.post(`api/user/lock/${id}`);
}

const fetchSavedArticle = (userID, articleID) => {
    return axios.post(`api/SaveArticle`, {
        "userTargetID": userID,
        "articleID": articleID
      });
}

const fetchGetAllSaved = (userID, pageNumber) => {
    return axios.get(`api/SaveArticle/target?id=${userID}&pageNumber=${pageNumber}&pageSize=10`);
}
export { fetchGetAll, fetchGetUserById, createUser, changeInfUser, deleteUser, lockUser, fetchGetAllSaved, fetchSavedArticle };