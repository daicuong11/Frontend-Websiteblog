import { useEffect, useState } from "react";
import { fetchGetAllCategory } from "../../services/CategoryService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./HomePage.scss";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [categorySelected, setCategorySelected] = useState(0);
    const [listCategory, setListCategory] = useState([]);

    useEffect(() => {
        getListCategory();
    }, [])

    // Lấy danh sách categories từ database
    const getListCategory = async () => {
        let res = await fetchGetAllCategory();
        setListCategory(res.data);
    }

    return (<>
        <div id="content" className="h-[1000px]">
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
                <div className="flex flex-col items-center col-span-1 h-4 pr-6">
                    <div>
                        <button className="w-11 h-11 bg-blue-600 rounded-full cursor-pointer hover:text-xl transition-all">
                            <FontAwesomeIcon className="" color="white" icon={faPlus} />
                        </button>
                    </div>
                    <div className="my-[10px]">
                        <div className="hover:bg-gray-100 rounded-xl cursor-pointer mt-1 w-[72px] h-[72px] flex flex-col justify-center items-center">
                            <Link to={"/"} ><FontAwesomeIcon icon={faHouse} /></Link>
                            <div className="text-xs font-sans font-semibold">Trang chủ</div>
                        </div>
                    </div>
                </div>
                {/* layout right */}
                <div className="col-span-11 pl-1 pr-[40px]">
                    <div className="px-11 h-4">
                        <div className="mb-20">
                            <h1 className="text-[28px] font-black my-[18px]">Bài viết nổi bật</h1>
                            <div className="text-sm">Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình web.</div>
                        </div>
                        <div className="grid grid-cols-12">
                            {/* List article */}
                            <div className="col-span-8 h-10 bg-gray-400">

                            </div>
                            {/* filter */}
                            <div className="col-span-4 h-10 bg-red-400">

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </>);
}

export default HomePage;