import axios from "./customize-axios";

const fetchGetAllNotificationByUserTargetID = (userID) => {
    return axios.get(`api/Notification/target?id=${userID}`);
}

const fetchCreateNotification = (title, articleTargetID, userTargetID, userID) => {
    return axios.post(`api/Notification`, {
        "title": title,
        "articleTargetID": articleTargetID,
        "userTargetID": userTargetID,
        "userID": userID
    });
}

const fetchIsReadNotify = (notifyID) => {
    return axios.put(`api/Notification/isRead?id=${notifyID}`);
}
export {
    fetchGetAllNotificationByUserTargetID,
    fetchCreateNotification,
    fetchIsReadNotify
};