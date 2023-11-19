import { useState, useEffect } from "react";
import ArticleCard from "../article/ArticleCard"
import ArticleCardL from "../article/ArticleCardL"
import { fetchGetAllArticleByCategoryID } from "../../../services/ArticleService";


const ListArticleSM = ({ categoryID }) => {
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
        <ul>
            {listArticlesByCategoryID.slice(0, 4).map((article, index) => {
                if (index === 0) {
                    return (
                        <li key={`article-${index}`}>
                            <ArticleCardL
                                title={article.title}
                                articleImagePath={`https://localhost:7020/api/images/${(article.imagePath)}`}
                            />
                        </li>
                    )
                }
                else {
                    return (
                        <li key={`article-${index}`}>
                            <hr className="ml-3" />
                            <ArticleCard
                                hoverText={true}
                                hidenStatus={true}
                                title={article.title}
                                articleImagePath={`https://localhost:7020/api/images/${(article.imagePath)}`}
                                description={article.description}
                            />
                        </li>
                    )
                }
            })}
        </ul>)
}

export default ListArticleSM;