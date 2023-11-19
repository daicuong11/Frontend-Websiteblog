import { Link, useParams } from "react-router-dom";
import ArtilceDetails from "../../components/project/artilce_details/ArtilceDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { fetchGetArticleById } from "../../services/ArticleService";


const ArtilceDetailsPage = () => {
    const { articleID } = useParams();
    const [article, setArticle] = useState({});

    useEffect(() => {
        getArticleByID(articleID);
    }, []);

    //get article by id
    const getArticleByID = async (id) => {
        let res = await fetchGetArticleById(id);
        if(res.status === true){
            setArticle(res.data);
        }
    }

    return (
        <div className="mt-[66px] px-11">
            <div className="grid grid-cols-12">
                <div className="col-span-3 sticky top-[66px] h-fit">
                    <div className="flex justify-end p-12 ml-auto">
                        <div>
                            <Link className="text-base font-semibold text-black mt-5" to={"auth/info"}>
                                Lý Đại Cương
                            </Link>
                            <hr className="min-w-[160px] mt-4"></hr>
                            <div className="flex mt-6">
                                <div className="cursor-pointer ml-2 flex justify-center items-center text-gray-400 hover:text-gray-500" title="Nhấn để yêu thích bài này">
                                <FontAwesomeIcon size="lg" icon={faHeart} />
                                    <span className="ml-2 text-base">12</span>
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
                    <ArtilceDetails 
                    article={article}
                    />
                </div>
                <div className="col-span-3 sticky top-[66px]">

                </div>
            </div>
        </div>
    )
}

export default ArtilceDetailsPage;
