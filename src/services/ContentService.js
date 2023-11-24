import axios from "./customize-axios";

const fetchCreateNewContent = (ContentTitle, ContentBody, ContentImage, ContentIndex, ArticleID) => {
    const formData = new FormData();
    formData.append('ContentTitle', ContentTitle);
    formData.append('ContentBody', ContentBody);
    formData.append('ContentImage', ContentImage);
    formData.append('ContentIndex', ContentIndex);
    formData.append('ArticleID', ArticleID);

    return axios.post(`api/content`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export {
    fetchCreateNewContent
};