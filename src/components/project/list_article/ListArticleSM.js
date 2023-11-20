import { useState, useEffect } from "react";
import ArticleCard from "../article/ArticleCard"
import ArticleCardL from "../article/ArticleCardL"
import { fetchGetAllArticleByCategoryID } from "../../../services/ArticleService";


const ListArticleSM = ({ categoryID, isFlexRow, title, className }) => {
    const [listArticlesByCategoryID, setListArticlesByCategoryID] = useState([]);

    useEffect(() => {
        getListArticlesOfBlog(categoryID);
    }, [categoryID])
    //Lấy tất cả Article of blog
    const getListArticlesOfBlog = async (categoryID) => {
        let res = await fetchGetAllArticleByCategoryID(categoryID, 1, 10);
        if (res.status === true) {
            setListArticlesByCategoryID(res.data);
        }
    }

    return (
        <div>
            {
                title &&
                <div className={`flex justify-center items-center mb-4 ${className}`}>
                    <h3 className="inline-block border-b-2 border-orange-500 text-2xl font-semibold pb-2">{title}</h3>
                </div>
            }
            <ul>
                {listArticlesByCategoryID.slice(0, 4).map((article, index) => {
                    if (index === 0) {
                        return (
                            <li className="mt-4 flex-col justify-center items-center" key={`article-${index}`}>
                                <ArticleCardL
                                    isFlexRow={isFlexRow}
                                    article={article}
                                />
                            </li>
                        )
                    }
                    else {
                        return article && (
                            <li className="mt-4 flex-col justify-center items-center" key={`article-${index}`}>
                                <hr className="mb-4"/>
                                <ArticleCard
                                    hoverText={true}
                                    hidenStatus={true}
                                    article={article}
                                />
                            </li>
                        )
                    }
                })}
            </ul>
        </div>
    )
}

export default ListArticleSM;