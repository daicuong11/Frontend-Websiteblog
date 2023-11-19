import { faBookmark, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import ModalAbsolute from "../../modal/ModalAbsolute";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ArticleCardL from "../article/ArticleCardL";
import { fetchGetUserById } from "../../../services/UserService";


const ArtilceDetails = ({ article }) => {
    const [clickedOptions, setClickedOptions] = useState(false);
    const [user, setUser] = useState({});
    

    // useEffect(() => {
    //     if(article.userID !== null){
    //         console.log(article);
    //         getUserById(article.userID);
    //     }
    // }, [article])


    const handleCloseModalOptions = () => {
        setClickedOptions(false);
    }

    //Lấy use theo id 
    const getUserById = async (id) => {
        let res = await fetchGetUserById(id);
        setUser(res.data);
    }

    return (
        <div className="px-3 mb-16">
            <div className="flex-col mb-">
                <h1 className="my-7 text-[40px] font-bold">{article ? article.title : 'Authentication & Authorization trong ReactJS'}</h1>
                <div className="flex justify-between items-center mb-7">
                    <div className="flex items-center">
                        <div className="">
                            <img className="w-[50px] h-[50px] max-w-[50px] max-h-[50px] border-[3px] border-r-red-500 border-t-yellow-500 border-b-red-500 border-l-red-500 rounded-full" alt="/color.jpg" src={user.image ? `https://localhost:7020/api/images/${user.image}` : "/color.jpg"} />
                        </div>
                        <div className="flex-col ml-2">
                            <div className="text-base text-black font-semibold">
                                {(user && user.name) || 'Đại Cương'}
                            </div>
                            <div className="text-gray-500 text-sm">01/01/2023</div>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="py-1 px-2 cursor-pointer text-gray-500">
                            <FontAwesomeIcon icon={faBookmark} />
                        </div>
                        <div onClick={() => setClickedOptions(!clickedOptions)} className="relative py-1 px-2 cursor-pointer text-gray-500">
                            <FontAwesomeIcon icon={faEllipsis} />
                            <ModalAbsolute
                                className={'top-10 right-0'}
                                onClose={handleCloseModalOptions}
                                onOpen={clickedOptions}
                                showIconClose={true}
                                modalHead={<h1 className="text-center text-black font-semibold">Chia sẻ</h1>}
                                modalBody={
                                    <div>
                                        <div className="pl-4 py-2 mb-2 cursor-pointer hover:bg-gray-100">Facebook</div>
                                        <div className="pl-4 py-2 mb-2 cursor-pointer hover:bg-gray-100">Zalo</div>
                                    </div>
                                }
                            />
                        </div>


                    </div>
                </div>
                {/* description */}
                <p className="text-lg my-[6px]">
                    Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền người dùng trước khi cho người dùng truy cập vào tài nguyên của ứng dụng.
                </p>

                <div id="content-article" className="flex-col my-5">
                    <h3 className="text-xl font-bold my-5">1. Đặt vấn đề</h3>
                    <p className="text-lg my-[6px]">
                        Ví dụ web quản trị nhưng có những page chỉ quản trị cấp cao Super Admin mới có thể truy cập được, còn mấy ông quản trị Admin không được quyền truy cập. Tránh tình trạng sau này sắp bị đuổi việc mấy ông vào xoá tài liệu/ bài viết của trang web như... :D
                    </p>
                </div>

                <div className="mt-[60px]">
                    <ul>
                        <li className="inline-block">
                            <div className="py-1 px-[10px] bg-gray-100 rounded text-gray-500 cursor-pointer text-sm mt-2 mr-2">Mới nhất</div>
                        </li>
                        <li className="inline-block">
                            <div className="py-1 px-[10px] bg-gray-100 rounded text-gray-500 cursor-pointer text-sm mt-2 mr-2">Yêu thích nhất</div>
                        </li>
                        <li className="inline-block">
                            <div className="py-1 px-[10px] bg-gray-100 rounded text-gray-500 cursor-pointer text-sm mt-2 mr-2">Giải trí</div>
                        </li>
                    </ul>
                </div>

                <div className="mt-[60px]">
                    <h3 className="text-[22px] font-semibold my-5">Bài đăng cùng tác giả</h3>

                    <ArticleCardL
                        isFlexRow={true}
                    />

                    <ArticleCardL
                        isFlexRow={true}
                    />
                </div>

                <div className="mt-[60px]">
                    <div className="h-[2px] bg-orange-600"></div>
                </div>

                <div className="mt-[60px]">
                    <h3 className="text-[32px] font-bold my-5">Bài viết nổi bật khác</h3>

                    <ArticleCardL
                        isFlexRow={true}
                    />

                    <ArticleCardL
                        isFlexRow={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default ArtilceDetails;