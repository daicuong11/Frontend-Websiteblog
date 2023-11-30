import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faClock, faHouse, faPen, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import MyModal from "../../components/modal/MyModal";
import { fetchGetAllSaved } from "../../services/UserService";
import { useMycontext } from "../../components/project/context/MyContextProvider";
import MyPanigation from '../../components/project/panigation/MyPanigation'

const MyPage = () => {
    const navigate = useNavigate();
    const { currentUser } = useMycontext();
    const [clickOptionPlus, setClickOptionPlus] = useState(false);
    const [paginationInfo, setPaginationInfo] = useState({});
    const [listSaveArticles, setListSaveArticles] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);


    const handleClickOptionPlus = () => {
        setClickOptionPlus(false);
    }

    useEffect(() => {
        if (currentUser) {
            (async (userID) => {
                let res = await fetchGetAllSaved(userID, pageNumber)
                setListSaveArticles(res.data);
                setPaginationInfo(res);
                // console.log(res);
            })(currentUser.userID, pageNumber);
        }
    }, []);

    //handle page number changes
    const handlePageChange = (pageNumber) => {
        setPageNumber(pageNumber);
    }

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
                        <div onClick={() => navigate('/')} className="hover:bg-gray-100 rounded-xl cursor-pointer mt-1 w-[72px] h-[72px] flex flex-col justify-center items-center">
                            <div ><FontAwesomeIcon icon={faHouse} /></div>
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
                        <h1 className="text-[28px] font-black my-[18px]">Bài viết đã lưu</h1>
                        <div className="text-sm"></div>
                    </div>
                    <div className="grid grid-cols-12">
                        {/* List article */}
                        <div className="col-span-8 pb-11 pr-16">
                            {listSaveArticles &&
                                listSaveArticles.map((saved, index) => {

                                    return (
                                        <div key={index} className="p-6 mb-4 border-2 rounded-2xl">
                                            <div className="grid grid-cols-3">
                                                <div className="col-span-2 mt-2">
                                                    <Link to={`/article/${saved.article.articleID}`} >
                                                        <h1 className="text-xl font-bold">
                                                            {saved.article.title}
                                                        </h1>
                                                    </Link>
                                                    <p className="text-[15px] mt-2 line-clamp-2">
                                                        {saved.article.description}
                                                    </p>
                                                    <div className="flex mt-3 justify-start items-center">
                                                        <p className="text-sm ml-4">
                                                            <span>
                                                                <FontAwesomeIcon color="gray" className="mr-2" icon={faCalendarDay} />
                                                                {saved.article.publishDate.split('.')[0].split('T')[0]}
                                                            </span>
                                                            <span>
                                                                <FontAwesomeIcon color="gray" className="mr-2 ml-4" icon={faClock} />
                                                                {saved.article.publishDate.split('.')[0].split('T')[1]}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-end">
                                                    <Link to={`/article/${saved.article.articleID}`}>
                                                        <img alt="" src={`https://localhost:7020/api/images/${saved.article.imagePath}`} className="w-[200px] h-[120px] max-w-[200px] max-h-[120px] rounded-xl"></img>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                            {listSaveArticles.length == 0 &&
                                <div className="text-center text-orange-500">
                                    Haha! Bạn đã lưu bài viết nào đâu 😁.
                                </div>
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

                            {/* <div className="mt-8 pr-[54px]">
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
                            </div> */}


                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default MyPage;