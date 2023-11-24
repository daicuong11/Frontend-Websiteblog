import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPen, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MyModal from "../../modal/MyModal";
import ArticleCardXL from "../../project/article/ArticleCardXL";
//import ArticleCard from "../../components/project/article/ArticleCard";
//import ArticleCardL from "../../components/project/article/ArticleCardL";
import ListArticleSM from "../../project/list_article/ListArticleSM";
import MyPanigation from "../../project/panigation/MyPanigation";

import { fetchGetAllArticle, fetchGetAllArticleByCategoryID, fetchGetAllArticleFavourite, fetchGetAllArticleLatest, fetchGetAllArticleOthers } from "../../../services/ArticleService";
import { useContext, useEffect, useState } from "react";

const listCategoryDes = {
    "Blog": 'Tổng hợp các blog chia sẻ về kinh nghiệm tự học và cuộc sống.',
    "Giải trí": 'Tổng hợp các bài viết giải trí vui vẻ.',
    "Mới nhất": 'Tổng hợp các bài viết mới nhất.',
    "Yêu thích nhiều nhất": 'Tổng hợp các bài viết được yêu thích nhiều nhất.',
    "Others": 'Tổng hợp các bài viết khác',

}

const MainContent = ({ listCategory, currentCategoryID, currentCategoryName, pageNumber, handleSetPageNumber, handleSetCategoryAndPageNumber }) => {
    const [listArticles, setListArticles] = useState([]);
    const [clickOptionPlus, setClickOptionPlus] = useState(false);
    const [paginationInfo, setPaginationInfo] = useState({});
    //const [openModalCreateBLog, setOpenModalCreateBLog] = useState(false);

    const handleClickOptionPlus = () => {
        setClickOptionPlus(false);
    }


    useEffect(() => {
        if (currentCategoryID === -1) {
            getListArticles(pageNumber);
        }
        else if (currentCategoryID <= -2) {
            getListArticlesByOptions(currentCategoryID, pageNumber);
        }
        else {
            getListArticlesByCategoryID(currentCategoryID, pageNumber);
        }
    }, [pageNumber, currentCategoryID])

    //Lấy tất cả Article
    const getListArticles = async (pageNumber, pageSize = 10) => {
        let res = await fetchGetAllArticle(pageNumber, pageSize);
        if (res.status === true) {
            setListArticles(res.data);
            setPaginationInfo(res);
        }
    }

    //Lấy tất cả Article
    const getListArticlesByCategoryID = async (currentCategoryID, pageNumber, pageSize = 10) => {
        let res = await fetchGetAllArticleByCategoryID(currentCategoryID, pageNumber, pageSize);
        if (res.status === true) {
            setListArticles(res.data);
            setPaginationInfo(res);
        }
    }

    // Lấy tất cả article mới nhất, yêu thích nhất, khác
    const getListArticlesByOptions = async (optionSelected, pageNumber, pageSize = 10) => {
        let res;
        if (optionSelected === -2) {
            // Lấy mới nhất
            res = await fetchGetAllArticleLatest(pageNumber, pageSize);
        }
        else if (optionSelected === -3) {
            // Lấy yêu thích nhất
            res = await fetchGetAllArticleFavourite(pageNumber, pageSize);

        }
        else if (optionSelected === -4) {
            // Lấy khác
            res = await fetchGetAllArticleOthers(pageNumber, pageSize);
        }

        if (res && res.status === true) {
            setListArticles(res.data);
            setPaginationInfo(res);
        }
    }


    //handle page number changes
    const handlePageChange = (pageNumber) => {
        handleSetPageNumber(pageNumber);
    }

    //handle getCategory by categoryName
    const handleGetCategoryByCategoryName = (categoryName) => {
        if (listCategory) {
            return listCategory.find(c => c.categoryName === categoryName);
        }
        return null;
    };


    return (
        <div className="grid grid-cols-12 mt-4">
            {/* layout left */}
            <div className="fixed top-[144px] left-[14px]">
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <button onClick={() => setClickOptionPlus(!clickOptionPlus)} className="w-11 h-11 bg-blue-600 rounded-full cursor-pointer hover:text-xl transition-all">
                            {clickOptionPlus ? <FontAwesomeIcon color="white" size="xl" icon={faXmark} /> : <FontAwesomeIcon color="white" icon={faPlus} />}
                        </button>
                        <MyModal
                            className={'left-[28px] top-[200px] bg-white'}
                            onOpen={clickOptionPlus}
                            onClose={handleClickOptionPlus}
                            modalBody={
                                <div className="list-add-new-item">
                                    <Link to={"/new_post/blog"} className={`cursor-pointer flex justify-start items-center py-3 px-4 mb-2 hover:bg-gray-100`}>
                                        <FontAwesomeIcon icon={faPen} />
                                        <div className="text-sm ml-4">Viết blog</div>
                                        
                                    </Link>
                                    <Link className="flex justify-start items-center py-3 px-4 mb-2 hover:bg-gray-100" to={"/new_post/entertainment"}>
                                        <FontAwesomeIcon icon={faPen} />
                                        <div className="text-sm ml-4">Bài giải trí</div>
                                    </Link>
                                </div>
                            }
                            modalHead={<h1 className="font-semibold text-center">Thêm mới</h1>}
                        />
                    </div>
                    <div className="my-[10px]">
                        <div className="hover:bg-gray-100 rounded-xl cursor-pointer mt-1 w-[72px] h-[72px] flex flex-col justify-center items-center">
                            <Link to={"/"} ><FontAwesomeIcon icon={faHouse} /></Link>
                            <div className="text-xs font-sans font-semibold">Trang chủ</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-1 pr-6 "></div>
            {/* layout right */}
            <div className="col-span-11 pl-1 pr-[40px]">
                <div className="px-11 mb-[60px]">
                    <div className="mb-20">
                        <h1 className="text-[28px] font-black my-[18px]">{currentCategoryName || 'Bài viết nổi bật'}</h1>
                        <div className="text-sm">{listCategoryDes[`${currentCategoryName}`] || 'Tổng hợp các bài viết chia sẻ về kinh nghiệm và giải trí hằng ngày.'}</div>
                    </div>
                    <div className="grid grid-cols-12">
                        {/* List article */}
                        <div className="col-span-8 pb-11 pr-16">
                            {/* article items */}
                            {(listArticles.length > 0) ?
                                (
                                    listArticles.map((article, index) => {
                                        let curCategory = listCategory.find(category => category.categoryID === article.categoryID);
                                        return (

                                            <ArticleCardXL
                                                key={`article-${index + 1}`}
                                                article={article}
                                                categoryID={curCategory ? curCategory.categoryID : 1}
                                                categoryName={curCategory ? curCategory.categoryName : ''}
                                                handleSetCategoryAndPageNumber={handleSetCategoryAndPageNumber}
                                            />
                                        )
                                    })
                                )
                                :
                                (
                                    <div className="text-center">
                                        Haha! Chưa có bài viết nào.
                                        <Link className="hover:text-orange-500 cursor-pointer transition-all" to={`/${currentCategoryName ? currentCategoryName.toLowerCase() : 'blog'}/new_post`} >Viết ngay!</Link>
                                    </div>
                                )
                            }

                            {/* pagination page */}
                            <MyPanigation
                                className={'mt-5'}
                                totalPages={paginationInfo.totalPages}
                                currentPage={paginationInfo.pageNumber}
                                pageSize={paginationInfo.pageSize}
                                onPageChange={handlePageChange}
                            />

                        </div>
                        {/* filter and Quảng cáo */}
                        <div className="col-span-4 px-3">
                            {/* Filter */}
                            <div className="my-4">
                                <h3 className="uppercase text-sm font-semibold text-gray-500">Các chủ đề được đề xuất</h3>
                            </div>
                            <ul className="my-4">
                                <li onClick={() => handleSetCategoryAndPageNumber(handleGetCategoryByCategoryName('Blog'), 1)} className="mr-2 mb-2 inline-block">
                                    <div className="px-4 py-[6px] cursor-pointer text-sm font-semibold text-black bg-gray-100 rounded-full" to={"/"}>Blog</div>
                                </li>
                                <li onClick={() => handleSetCategoryAndPageNumber(handleGetCategoryByCategoryName('Giải trí'), 1)} className="mr-2 mb-2 inline-block">
                                    <div className="px-4 py-[6px] cursor-pointer text-sm font-semibold text-black bg-gray-100 rounded-full" to={"/"}>Giải trí</div>
                                </li>
                                <li onClick={() => handleSetCategoryAndPageNumber({ categoryID: -2, categoryName: 'Mới nhất' }, 1)} className="mr-2 mb-2 inline-block">
                                    <div className="px-4 py-[6px] cursor-pointer text-sm font-semibold text-black bg-gray-100 rounded-full" to={"/"}>Mới nhất</div>
                                </li>
                                <li onClick={() => handleSetCategoryAndPageNumber({ categoryID: -3, categoryName: 'Yêu thích nhiều nhất' }, 1)} className="mr-2 mb-2 inline-block">
                                    <div className="px-4 py-[6px] cursor-pointer text-sm font-semibold text-black bg-gray-100 rounded-full" to={"/"}>Yêu thích nhất</div>
                                </li>
                                <li onClick={() => handleSetCategoryAndPageNumber({ categoryID: -4, categoryName: 'Others' }, 1)} className="mr-2 mb-2 inline-block">
                                    <div className="px-4 py-[6px] cursor-pointer text-sm font-semibold text-black bg-gray-100 rounded-full" to={"/"}>Others</div>
                                </li>
                            </ul>

                            {/* Quảng cáo */}
                            <div className="mt-8">
                                <div className="mb-8">
                                    <Link to={"https://tdtu.edu.vn/"}>
                                        <img className="cursor-pointer rounded-xl border w-[320px] h-[250px] max-w-[320px] max-h-[250px]" alt="Quảng cáo" src="/logoTDTUXL.png" />
                                    </Link>
                                </div>
                                <div>
                                    <Link to={"https://it.tdtu.edu.vn/"}>
                                        <img className="cursor-pointer rounded-xl border w-[320px] h-[250px] max-w-[320px] max-h-[250px]" alt="Quảng cáo" src="/logoKhoaCNTT.png" />
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-8 pr-[54px]">
                                <div className="flex justify-center items-center mb-4">
                                    <Link to={"/entertainment"}>
                                        <h3 className="inline-block border-b-2 border-orange-500">Blog</h3>
                                    </Link>
                                </div>
                                <ListArticleSM
                                    categoryID={1}
                                />
                            </div>

                            <div className="mt-8 pr-[54px]">
                                <div className="flex justify-center items-center mb-4">
                                    <Link to={"/entertainment"}>
                                        <h3 className="inline-block border-b-2 border-orange-500">Giải Trí</h3>
                                    </Link>
                                </div>
                                <ListArticleSM
                                    categoryID={2}
                                />
                            </div>


                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default MainContent;