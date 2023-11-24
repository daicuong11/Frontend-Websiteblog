import axios from "./customize-axios";

const fetchLoveArticle = (userID, articleID) => {
    return axios.post(`api/Love`, {
        userTargetID: userID,
        articleID: articleID
      });
}

export { fetchLoveArticle };