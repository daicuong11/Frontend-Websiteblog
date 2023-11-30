import { faBookmark, faCalendarDay, faClock, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import ModalAbsolute from "../../modal/ModalAbsolute";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ListArticleSM from "../list_article/ListArticleSM";
import ContentIsShow from "../article_content/ContentIsShow";
import { fetchGetAllArticleByUserID } from "../../../services/ArticleService";
import { Link } from "react-router-dom";
import { async } from "q";
import { useMycontext } from "../context/MyContextProvider";
import { fetchSavedArticle } from "../../../services/UserService";


const ArtilceDetails = ({ article }) => {
    const { currentUser, setCurrentUser, isModalOpenLogin, setIsModalOpenLogin, isUnauthorized, setUnauthorized, resetUnauthorized } = useMycontext();
    const [isSaved, setIsSaved] = useState(false);
    const [clickedOptions, setClickedOptions] = useState(false);
    const [userArticles, setUserArticles] = useState([]);

    useEffect(() => {
        getListArticlesByUserID(article.user.userID);
    }, []);

    //Lấy tất cả Article của user 
    const getListArticlesByUserID = async (id) => {
        let res = await fetchGetAllArticleByUserID(id);
        if (res.status === true) {
            setUserArticles(res.data);
        }
    }

    const handleCloseModalOptions = () => {
        setClickedOptions(false);
    }

    const handleSavedArticle = async () => {
        if(isUnauthorized){
            setIsModalOpenLogin(true);
        }
        else {
            // console.log(currentUser.userID + ' / ' + article.articleID);
            let res = await fetchSavedArticle(currentUser.userID, article.articleID);

            if(res.status == true) {
                setIsSaved(!isSaved);
            }
        }
    }

    return article && (
        <div className="px-3 mb-16">
            <div className="flex-col mb-4">
                <h1 className="my-7 text-[40px] font-bold">{article ? article.title : 'Authentication & Authorization trong ReactJS'}</h1>
                <div className="flex justify-between items-center mb-7">
                    <div className="flex items-center">
                        <div className="">
                            <img className="w-[50px] h-[50px] max-w-[50px] max-h-[50px] border-[3px] border-r-red-500 border-t-yellow-500 border-b-red-500 border-l-red-500 rounded-full" alt="/color.jpg" src={"/color.jpg"} />
                        </div>
                        <div className="flex-col ml-2">
                            <div className="text-base text-black font-semibold">
                                {article ? article.user.name : 'Lý Đại Cương'}
                            </div>
                            <div className="text-gray-500 text-sm">
                                <span>
                                    <FontAwesomeIcon color="gray" className="mr-2" icon={faCalendarDay} />
                                    {article ? `${article.publishDate.split('.')[0].split('T')[0]}` : '01-01-2003'}
                                </span>
                                <span>
                                    <FontAwesomeIcon color="gray" className="mr-2 ml-4" icon={faClock} />
                                    {article ? `${article.publishDate.split('.')[0].split('T')[1]}` : '00:00:01'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex">
                        <div onClick={() => handleSavedArticle()} className="py-1 px-2 cursor-pointer text-gray-500">
                            <FontAwesomeIcon className={`${isSaved ? 'text-orange-500' : ''}`} icon={faBookmark} />
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
                    {article ? article.description : 'Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền người dùng trước khi cho người dùng truy cập vào tài nguyên của ứng dụng.'}
                </p>

                {/*render content */}
                {article &&
                    article.contents.sort((a, b) => a.contentIndex - b.contentIndex).map((content, index) => {
                        return (
                            <ContentIsShow
                                key={index}
                                content={content}
                            />
                        )
                    })}

                {/* <div className="mt-[60px]">
                    <ul>
                        <li className="inline-block">
                            <div className="py-1 px-[10px] bg-gray-100 rounded text-gray-500 cursor-pointer text-sm mt-2 mr-2">Mới nhất</div>
                        </li>
                        <li className="inline-block">
                            <div className="py-1 px-[10px] bg-gray-100 rounded text-gray-500 cursor-pointer text-sm mt-2 mr-2">Yêu thích nhất</div>
                        </li>
                        <li className="inline-block">
                            <div className="py-1 px-[10px] bg-gray-100 rounded text-gray-500 cursor-pointer text-sm mt-2 mr-2">Đọc nhiều nhất</div>
                        </li>
                    </ul>
                </div> */}

                <div className="mt-[60px]">
                    <h3 className="text-[22px] font-semibold my-5">Bài đăng cùng tác giả</h3>

                    <div className="ml-5">
                        <ul className="list-disc list-inside">
                            {userArticles.map((article, index) => {
                                return (
                                    <li key={index} className="py-1 text-base">
                                        <span className="hover:underline cursor-pointer"  onClick={() => window.location.href = `/article/${article.articleID}`}>
                                            {article.title}
                                        </span>
                                    </li>
                                )
                            })

                            }
                        </ul>
                    </div>

                </div>

                <div className="mt-[60px]">
                    <div className="h-[2px] bg-orange-600"></div>
                </div>

                <div className="mt-[60px]">
                    <h3 className="text-[32px] font-bold my-5">Bài viết nổi bật khác</h3>
                    <ListArticleSM
                        title={'Các bài viết blog'}
                        categoryID={1}
                        isFlexRow={true}
                    />
                    <div className="my-8"></div>
                    <ListArticleSM
                        title={'Các bài viết giải trí'}
                        categoryID={2}
                        isFlexRow={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default ArtilceDetails;