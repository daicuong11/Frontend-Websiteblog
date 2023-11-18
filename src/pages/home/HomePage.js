import { useEffect, useState } from "react";
import { fetchGetAllCategory } from "../../services/CategoryService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPen, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./HomePage.scss";
import { Link } from "react-router-dom";
import MyModal from "../../components/modal/MyModal";
import ArticleCardXL from "../../components/project/article/ArticleCardXL";
import ArticleCard from "../../components/project/article/ArticleCard";
import { fetchGetAllArticle } from "../../services/ArticleService";

const HomePage = () => {
    const [categorySelected, setCategorySelected] = useState(0);
    const [listArticles, setListArticles] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [clickOptionPlus, setClickOptionPlus] = useState(true);

    const handleClickOptionPlus = () => {
        setClickOptionPlus(false);
    }

    useEffect(() => {
        getListCategory();
        getListArticles();
    }, [])

    // Lấy danh sách categories từ database
    const getListCategory = async () => {
        let res = await fetchGetAllCategory();
        setListCategory(res.data);
    }

    //Lấy tất cả Article
    const getListArticles = async () => {
        let res = await fetchGetAllArticle();
        if(res.status === true) {
            setListArticles(res.data);
        }
    }

    return (<>
        <div id="content" className="mt-[66px]">
            {/* Hiển thị danh mục */}
            <div className="flex justify-center items-center">
                <span className="flex border-b-2">
                    <div className="text-sm mx-[6px] py-[14px] font-semibold hover:text-orange-500 cursor-pointer">
                        <button onClick={() => setCategorySelected(0)} className="focus:text-orange-500">Tất cả</button>
                    </div>
                    {listCategory.map((category, index) => {
                        return (
                            <div key={`category-${category.categoryID}`} className="text-sm mx-[6px] py-[14px] font-semibold hover:text-orange-500 cursor-pointer">
                                <button onClick={() => setCategorySelected(category.categoryID)} className="focus:text-orange-500">{category.categoryName}</button>
                            </div>
                        )
                    })}
                </span>
            </div>

            {/* Main content */}
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
                                        <Link className="flex justify-start items-center py-3 px-4 mb-2 hover:bg-gray-100" to={"/blog/new_post"}>
                                            <FontAwesomeIcon icon={faPen} />
                                            <div className="text-sm ml-4">Viết blog</div>
                                        </Link>
                                        <Link className="flex justify-start items-center py-3 px-4 mb-2 hover:bg-gray-100" to={"/entertainment/new_post"}>
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
                    <div className="px-11">
                        <div className="mb-20">
                            <h1 className="text-[28px] font-black my-[18px]">Bài viết nổi bật</h1>
                            <div className="text-sm">Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình web.</div>
                        </div>
                        <div className="grid grid-cols-12">
                            {/* List article */}
                            <div className="col-span-8 pb-11 pr-16">
                                {/* article items */}
                                {listArticles.map((article, index) => {
                                    return (

                                        <ArticleCardXL
                                            userID={article.userID}
                                            key={`article-${index + 1}`}
                                            title={article.title}
                                            description={article.description}
                                            articleImage={`https://localhost:7020/api/images/${(article.imagePath.split('\\')[2])}`}
                                            publishDate={article.publishDate.split('T')[0]}
                                        />
                                    )
                                })}
                            </div>
                            {/* filter and Quảng cáo */}
                            <div className="col-span-4 px-3">
                                {/* Filter */}
                                <div className="my-4">
                                    <h3 className="uppercase text-sm font-semibold text-gray-500">Các chủ đề được đề xuất</h3>
                                </div>
                                <ul className="my-4">
                                    <li className="mr-4 mb-4 inline-block">
                                        <Link className="px-4 py-[6px] text-sm font-semibold text-black bg-gray-100 rounded-full" to={"/"}>Blog</Link>
                                    </li>
                                    <li className="mr-4 mb-4 inline-block">
                                        <Link className="px-4 py-[6px] text-sm font-semibold text-black bg-gray-100 rounded-full" to={"/"}>Giải trí</Link>
                                    </li>
                                    <li className="mr-4 mb-4 inline-block">
                                        <Link className="px-4 py-[6px] text-sm font-semibold text-black bg-gray-100 rounded-full" to={"/"}>Mới nhất</Link>
                                    </li>
                                    <li className="mr-4 mb-4 inline-block">
                                        <Link className="px-4 py-[6px] text-sm font-semibold text-black bg-gray-100 rounded-full" to={"/"}>Đọc nhiều nhất</Link>
                                    </li>
                                    <li className="mr-4 mb-4 inline-block">
                                        <Link className="px-4 py-[6px] text-sm font-semibold text-black bg-gray-100 rounded-full" to={"/"}>Others</Link>
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

                                <div className="mt-8 pr-[70px]">
                                    <div className="flex justify-center items-center mb-4">
                                        <Link to={"/entertainment"}>
                                            <h3 className="inline-block border-b-2 border-orange-500">Giải Trí</h3>
                                        </Link>
                                    </div>
                                    <ul>
                                        <li>
                                            <ArticleCard hidenStatus={true} />
                                        </li>
                                        <li><hr /></li>
                                        <li>
                                            <ArticleCard hidenStatus={true} />
                                        </li>
                                        <li><hr /></li>
                                        <li>
                                            <ArticleCard hidenStatus={true} />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </>);
}

export default HomePage;