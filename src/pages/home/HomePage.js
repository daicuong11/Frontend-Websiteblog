import { useEffect, useState } from "react";
import { fetchGetAllCategory } from "../../services/CategoryService";
import "./HomePage.scss";
import MainContent from "../../components/project/home/MainContent";
import { useMycontext } from "../../components/project/context/MyContextProvider";



const HomePage = () => {
    const [categorySelected, setCategorySelected] = useState({ categoryID: -1, categoryName: 'Bài viết nổi bật' });
    const {listCategory, setListCategory} = useMycontext();
    const [pageNumber, setPageNumber] = useState(1);


    const handleSetCategoryAndPageNumber = (category, pageNumber) => {
        setCategorySelected(category);
        setPageNumber(pageNumber);
    }

    const handleSetPageNumber = (pageNumber) => {
        setPageNumber(pageNumber);
    }

    useEffect(() => {
        getListCategory();
    }, []);

    // Lấy danh sách categories từ database
    const getListCategory = async () => {
        let res = await fetchGetAllCategory();
        setListCategory(res.data);
    }

    //console.log(categorySelected);
    //console.log('list categories', listCategory)
    //console.log('list paginationInfo', paginationInfo);

    return (<>
        <div id="content" className="mt-[66px]">
            {/* Hiển thị danh mục */}
            <div className="flex justify-center items-center">
                <span className="flex border-b-2">
                    {(categorySelected.categoryID === -1) ?
                        <div onClick={() => handleSetCategoryAndPageNumber({ categoryID: -1, categoryName: 'Bài viết nổi bật' }, 1)} className="text-orange-500 text-sm mx-[6px] py-[14px] font-semibold hover:text-orange-500 cursor-pointer">
                            <button className="focus:text-orange-500">Tất cả</button>
                        </div>
                        :
                        <div onClick={() => handleSetCategoryAndPageNumber({ categoryID: -1, categoryName: 'Bài viết nổi bật' }, 1)} className="text-sm mx-[6px] py-[14px] font-semibold hover:text-orange-500 cursor-pointer">
                            <button className="focus:text-orange-500">Tất cả</button>
                        </div>
                    }
                    {listCategory && listCategory.map((category, index) => {
                        if (category.categoryID === categorySelected.categoryID) {
                            return (
                                <div onClick={() => handleSetCategoryAndPageNumber(category, 1)} key={`category-${index + 1}`} className="text-orange-500 text-sm mx-[6px] py-[14px] font-semibold hover:text-orange-500 cursor-pointer">
                                    <button className="focus:text-orange-500">{category.categoryName}</button>
                                </div>
                            )
                        }
                        else {
                            return (
                                <div onClick={() => handleSetCategoryAndPageNumber(category, 1)} key={`category-${index + 1}`} className="text-sm mx-[6px] py-[14px] font-semibold hover:text-orange-500 cursor-pointer">
                                    <button className="focus:text-orange-500">{category.categoryName}</button>
                                </div>
                            )
                        }
                    })}
                </span>
            </div>

            {/* Main content show article */}
            <MainContent
                listCategory={listCategory}
                currentCategoryID={categorySelected.categoryID}
                currentCategoryName={categorySelected.categoryName}
                handleSetPageNumber={handleSetPageNumber}
                pageNumber={pageNumber}
                handleSetCategoryAndPageNumber={handleSetCategoryAndPageNumber}
            />
        </div>
    </>);
}

export default HomePage;