import { Link, useParams } from "react-router-dom";
import ArticleDetails from "../../components/project/article_details/ArticleDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { fetchGetArticleById } from "../../services/ArticleService";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import { useMycontext } from "../../components/project/context/MyContextProvider";
import { fetchLoveArticle } from "../../services/LoveService";


const ArtilceDetailsPage = () => {
    const { currentUser, setCurrentUser, isModalOpenLogin, setIsModalOpenLogin, isUnauthorized, setUnauthorized, resetUnauthorized } = useMycontext();
    const { articleID } = useParams();
    const [article, setArticle] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoved, setIsLoves] = useState(false);

    setTimeout(() => {
        setIsLoading(false)
    }, 500);



    //get article by id
    const getArticleByID = async (id) => {
        let res = await fetchGetArticleById(id);
        if (res.status === true) {
            setArticle(res.data);
            if(currentUser && currentUser.userID){
                const loved = res.data.loves.find(l => l.userTargetID == currentUser.userID)
                if(loved) {
                    setIsLoves(true);
                }
                else {
                    setIsLoves(false);
                }
            }
        }
    }

    useEffect(() => {
        getArticleByID(articleID);
    }, [isUnauthorized, isLoved]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
        handleLoading();
    });

    //handle love article
    const handleLoveArticle = async () => {
        if(isUnauthorized){
            setIsModalOpenLogin(true);
        }
        else {
            let res = await fetchLoveArticle(currentUser.userID, article.articleID);
            if(res.status == true) {
                setIsLoves(!isLoved);
            }
        }
    }

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
    return article && (
        <div className="mt-[66px] px-11">
            <div className="grid grid-cols-12">
                <div className="col-span-3 sticky top-[66px] h-fit">
                    <div className="flex justify-end p-12 ml-auto">
                        <div>
                            <Link className="text-base font-semibold text-black mt-5" to={"/auth/info"}>
                                {article ? article.user.name : 'Lý Đại Cương'}
                            </Link>
                            <hr className="min-w-[160px] mt-4"></hr>
                            <div className="flex mt-6">
                                <div onClick={() => handleLoveArticle()} className="cursor-pointer ml-2 flex justify-center items-center text-gray-400 hover:text-gray-500" title="Nhấn để yêu thích bài này">
                                    <FontAwesomeIcon className={`${isLoved ? 'text-red-500' : ''}`} size="lg" icon={faHeart} />
                                    <span className="ml-2 text-base">{article.loves.length}</span>
                                </div>
                                <div className="cursor-pointer ml-8 flex justify-center items-center text-gray-400 hover:text-gray-500" title="Nhấn để bình luận bài viết">
                                    <FontAwesomeIcon size="lg" icon={faComment} />
                                    <span className="ml-2 text-base">3</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-span-6 overflow-y-auto">
                    <ArticleDetails
                        article={article}
                    />
                </div>
                <div className="col-span-3 sticky top-[66px] h-1">

                </div>
            </div>
        </div>
    )
}

export default ArtilceDetailsPage;
