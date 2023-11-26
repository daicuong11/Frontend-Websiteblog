import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import ListArticleLovest from "../../components/project/list_article/ListArticleLovest";
import { fetchGetUserById } from "../../services/UserService";
import { useEffect } from "react";
import { useState } from "react";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import { fetchGetAllNotificationByUserCreateID } from "../../services/NotificationService";

const InfoPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState();
    const [listAction, setListAction] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    setTimeout(() => {
        setIsLoading(false)
    }, 1000);

    useEffect(() => {
        if (params.userID) {
            handleGetUserByID(params.userID);
            handleGetListActionByUserID(params.userID);
        }
    }, [params.userID]);

    const handleGetUserByID = async (userID) => {
        if (userID) {
            let res = await fetchGetUserById(userID);
            if (res.status === true) {
                setUserInfo(res.data);
            }
            else {
                navigate('/not-found');
            }

        }
    }

    const handleGetListActionByUserID = async (userID) => {
        if (userID) {
            let res = await fetchGetAllNotificationByUserCreateID(userID);
            if (res.status === true) {
                setListAction(res.data);
            }

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

    useEffect(() => {
        handleLoading();
    });

    const handleLoading = () => {
        if (isLoading) {
            return (
                <div className='fixed top-[50%] left-[50%]'>
                    <div className='flex items-center justify-center'>
                        <LoadingSpinner className={'w-6 h-6'} />
                    </div>
                </div>
            )
        }
    }

    return userInfo && (
        <div className="w-[1100px] box-border mx-auto min-h-screen mb-5">
            <div className="h-[308px] bg-cover bg-center rounded-2xl relative bg-[url('http://localhost:3000/bg-blog.webp')]">
                <div className="absolute -bottom-[calc(50%-166px/2)] left-10 flex justify-center gap-4">
                    <div className="p-2 rounded-full bg-white">
                        <img className="w-[150px] h-[150px] rounded-full" src='/color.jpg' alt='' />
                    </div>
                    <div className="mt-auto font-bold text-[28px] mb-4">{userInfo.name}</div>
                </div>
            </div>
            <div className="mt-[90px] px-6 grid grid-cols-5 gap-6">
                <div className="col-span-2">
                    <div className="border-[1px] border-gray-200 border-opacity-70 p-4 shadow-md rounded-md">
                        <h3 className="font-semibold text-base">Giới thiệu</h3>
                        <div className="">
                            <ul className="mt-2 list-inside">
                                <li className="text-sm">
                                    <FontAwesomeIcon color="gray" icon={faUserGroup} />
                                    <span className="ml-2 text-black">Thành viên của  <strong>HC BLOG</strong> {userInfo.createAt ? `từ ${handleGetDate(userInfo.createAt)}` : ''}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-6 border-[1px] border-gray-200 border-opacity-70 p-4 shadow-md rounded-md">
                        <h3 className="font-semibold text-base">Hoạt động gần đây</h3>
                        <div className="">
                            <ul className="mt-3 list-inside">
                                {listAction.map((action, index) => {
                                    if (index === 0) {
                                        return (
                                            <li key={index} className="text-sm flex">
                                                <div className="">
                                                    <img className="w-[40px] h-[40px] max-w-[40px] max-h-[40px] border-[3px] border-r-red-500 border-t-yellow-500 border-b-red-500 border-l-red-500 rounded-full" alt="/color.jpg" src={"/color.jpg"} />
                                                </div>
                                                <div className="ml-2 text-black">
                                                    <div className="font-semibold">
                                                        {action.userCreate.name}
                                                        <p onClick={() => navigate(`/article/${action.articleTargetID}`)} dangerouslySetInnerHTML={{ __html: action.title }} className="inline font-normal ml-1 line-clamp-4 cursor-pointer hover:underline">
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    }
                                    return (
                                        <div key={index}>
                                            <li className="my-3">
                                                <hr />
                                            </li>
                                            <li className="text-sm flex">
                                                <div className="">
                                                    <img className="w-[40px] h-[40px] max-w-[40px] max-h-[40px] border-[3px] border-r-red-500 border-t-yellow-500 border-b-red-500 border-l-red-500 rounded-full" alt="/color.jpg" src={"/color.jpg"} />
                                                </div>
                                                <div className="ml-2 text-black">
                                                    <div className="font-semibold">
                                                        {action.userCreate.name}
                                                        <p onClick={() => navigate(`/article/${action.articleTargetID}`)} dangerouslySetInnerHTML={{ __html: action.title }} className="inline font-normal ml-1 line-clamp-4 cursor-pointer hover:underline">
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        </div>
                                    )
                                })}
                                {listAction.length === 0 && <li className=""><div className="text-center text-orange-600 mb-4">Bạn chưa có hoạt động nào gần đây. 😁</div></li>}


                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="border-[1px] border-gray-200 border-opacity-70 p-4 shadow-md rounded-md">
                        <h3 className="font-semibold text-base">Top 3 bài viết được yêu thích nhất</h3>
                        <div className="mt-3">
                            {/* <ul className="mt-2 list-inside">
                                <li className="text-sm">
                                    <FontAwesomeIcon color="gray" icon={faUserGroup} />
                                    <span className="ml-2 text-black">Thành viên của F8 - Học lập trình để đi làm từ một năm trước</span>
                                </li>
                            </ul> */}
                            <ListArticleLovest
                                userID={userInfo.userID}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoPage;