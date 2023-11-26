import { useState, useEffect } from "react";
import { fetchGetTop3FavouriteByUserID } from "../../../services/ArticleService";
import { useNavigate } from "react-router-dom";


const ListArticleLovest = ({ userID, className }) => {
    const [listTop3ArticleFavourite, setListTop3ArticleFavourite] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        getListArticlesOfBlog(userID);
    }, [userID])
    //Lấy tất cả Article of blog
    const getListArticlesOfBlog = async (userID) => {
        let res = await fetchGetTop3FavouriteByUserID(userID);
        if (res.status === true) {
            setListTop3ArticleFavourite(res.data);
        }
    }

    return (
        <div>
            <ul>
                {listTop3ArticleFavourite.slice(0, 3).map((article, index) => {
                    if (index === 0) {
                        return (
                            <li className="mt-4 flex-col" key={`article-${index}`}>
                                <div onClick={() => navigate(`/article/${article.articleID}`)} className={`flex items-center px-3 py-2 cursor-pointer m-2 hover:bg-gray-100 transition-all rounded-lg h-full`}>
                                    <div className="">
                                        <img className="rounded-lg w-[228px] h-[128px] min-w-[228px] min-h-[128px]" alt="" src={article ? `https://localhost:7020/api/images/${article.imagePath}` : `/color.jpg`} />
                                    </div>
                                    <div className="flex-col ml-4">
                                        <p className="text-base font-semibold hover:text-orange-600 line-clamp-2">{article ? article.title : 'Cách code React Cách code React Cách code React Cách code React Cách code React'}</p>
                                        <p className="text-sm mb-auto leading-5 mt-1 line-clamp-4">{article ? article.description : 'Cách implement này tách biệt việc handle sign-in với việc quản lý phiên đăng nhập của user, sign-in không cần quan tâm sau khi sign-in xong ứng dụng sẽ xảy ra hành vi gì tiếp theo, việc quản lý phiên đăng nhập cụng không cần biết sign-in đăng nhập như thế nào.'}</p>
                                    </div>
                                </div >
                            </li>
                        )
                    }
                    else {
                        return article && (
                            <li className="mt-4 flex-col" key={`article-${index}`}>
                                <hr className="mb-4" />
                                <div onClick={() => navigate(`/article/${article.articleID}`)} className={`flex px-3 py-2 cursor-pointer m-2 hover:bg-gray-100 transition-all rounded-lg h-full`}>
                                    <div className="">
                                        <img className="rounded-2xl w-[228px] h-[128px] min-w-[228px] min-h-[128px]" alt="" src={article ? `https://localhost:7020/api/images/${article.imagePath}` : `/color.jpg`} />
                                    </div>
                                    <div className="flex-col ml-4">
                                        <p className="text-base font-semibold hover:text-orange-600 line-clamp-2">{article ? article.title : 'Cách code React Cách code React Cách code React Cách code React Cách code React'}</p>
                                        <p className="text-sm mb-auto leading-5 mt-1 line-clamp-4">{article ? article.description : 'Cách implement này tách biệt việc handle sign-in với việc quản lý phiên đăng nhập của user, sign-in không cần quan tâm sau khi sign-in xong ứng dụng sẽ xảy ra hành vi gì tiếp theo, việc quản lý phiên đăng nhập cụng không cần biết sign-in đăng nhập như thế nào.'}</p>
                                    </div>
                                </div >
                            </li>
                        )
                    }
                })}
                {listTop3ArticleFavourite.length === 0 && <li className=""><div className="text-center text-orange-600 mb-4">Bạn chưa đăng bài viết nào. 😁</div></li>}
            </ul>
        </div>
    )
}

export default ListArticleLovest
    ;