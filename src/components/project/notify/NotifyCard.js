import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchIsReadNotify } from "../../../services/NotificationService";
import { toast } from "react-toastify";

const NotifyCard = ({ notification, handleOnCloseNotify }) => {
    const navigate = useNavigate();

    const handleClicked = async () => {
        if (notification.isRead === false) {
            let res = await fetchIsReadNotify(notification.notificationID);
            if (res.status === true) {
            }
            handleOnCloseNotify();
        }
    }

    const handleGetDate = (createdAt) => {
        const currentDate = new Date();
        const createdAtDate = new Date(createdAt);

        const timeDifference = currentDate - createdAtDate;
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

        if (daysDifference >= 1) {
            return `${Math.floor(daysDifference)} ngày trước`;
        } else {
            const hoursDifference = timeDifference / (1000 * 60 * 60);
            if (hoursDifference >= 1) {
                return `${Math.floor(hoursDifference)} giờ trước`;
            } else {
                const minutesDifference = timeDifference / (1000 * 60);
                if (minutesDifference >= 1) {
                    return `${Math.floor(minutesDifference)} phút trước`;
                } else {
                    return 'vừa xong';
                }
            }
        }
    };



    return notification && (<>
        <div onClick={() => { window.location.href.includes('/article/') ? window.location.href = `/article/${notification.articleTargetID}` : navigate(`/article/${notification.articleTargetID}`); handleClicked(); }} className="relative cursor-pointer">
            <div className={`m-2 py-2 pr-8 flex transition-all rounded-lg ${notification.isRead ? 'hover:bg-gray-100' : 'bg-red-100 bg-opacity-50'}`}>
                <div className="px-3 py-2">
                    <img className="rounded-full w-[42px] h-[42px] min-w-[42px] min-h-[42px]" alt="" src={`${'/color.jpg'}`} />
                </div>
                <div className="flex flex-col justify-center items-start w-full">
                    <div className="font-semibold">
                        {notification.userCreate.name}
                        <p className="inline text-sm ml-1 line-clamp-2" dangerouslySetInnerHTML={{ __html: notification.title }}>
                        </p>
                    </div>
                    <div className="text-xs mt-1 font-normal text-orange-500">
                        {handleGetDate(`${notification.createdAt}`) || '3 ngày trước'}
                    </div>
                </div>
            </div>
            {notification.isRead || (<>
                <span className="animate-ping absolute top-[calc(50%-8px)] right-[15px] inline-flex h-4 w-4 rounded-full bg-sky-400 opacity-75"></span>
                <span className="absolute top-[calc(50%-6px)] right-[18px] inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </>)}
        </div>
    </>)
}

export default NotifyCard;