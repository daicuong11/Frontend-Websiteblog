import { useEffect, useState } from "react";
import { fetchGetAllCategory } from "../../services/CategoryService";
import "./HomePage.scss";
import MainContent from "../../components/project/home/MainContent";



const HomePage = () => {
    const [categorySelected, setCategorySelected] = useState(0);
    const [listCategory, setListCategory] = useState([]);


    //console.log(listCategory);
    useEffect(() => {
        getListCategory();
    },[]);

    // Lấy danh sách categories từ database
    const getListCategory = async () => {
        let res = await fetchGetAllCategory();
        setListCategory(res.data);
        //console.log(res);
    }

    //console.log('list categories', listCategory)
    //console.log('list paginationInfo', paginationInfo);

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
                            <div key={`category-${index + 1}`} className="text-sm mx-[6px] py-[14px] font-semibold hover:text-orange-500 cursor-pointer">
                                <button onClick={() => setCategorySelected(category.categoryID)} className="focus:text-orange-500">{category.categoryName}</button>
                            </div>
                        )
                    })}
                </span>
            </div>

            {/* Main content show article */}
            <MainContent 
            listCategory={listCategory}
            />
        </div>
    </>);
}

export default HomePage;