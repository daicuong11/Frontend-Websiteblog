import { faBookmark, faCalendarDay, faClock, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ModalAbsolute from "../../modal/ModalAbsolute";


const ArticleCardXL = ({ article, handleSetCategoryAndPageNumber }) => {
    const [clickedOptions, setClickedOptions] = useState(false);

    const handleCloseModalOptions = () => {
        setClickedOptions(false);
    }

    const handleMoveScreenOnTop = () => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    };

    return (<>
        <div className="p-6 mb-4 border-2 rounded-2xl">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className="">
                        <img className="w-[30px] h-[30px] max-w-[30px] max-h-[30px] border-[3px] border-r-red-500 border-t-yellow-500 border-b-red-500 border-l-red-500 rounded-full" alt="/color.jpg" src={"/color.jpg"} />
                    </div>
                    <div className="text-xs text-black font-semibold ml-2">
                        {(article && article.user) ? article.user.name : 'Đại Cương'}
                    </div>
                </div>

                <div className="flex">
                    <div className="py-1 px-2 cursor-pointer text-gray-500">
                        <FontAwesomeIcon icon={faBookmark} />
                    </div>
                    <div onClick={() => setClickedOptions(!clickedOptions)} className="relative z-0 py-1 px-2 cursor-pointer text-gray-500">
                        <FontAwesomeIcon icon={faEllipsis} />
                        <ModalAbsolute
                            className={'top-10 right-0 bg-white'}
                            onClose={handleCloseModalOptions}
                            onOpen={clickedOptions}
                            showIconClose={true}
                            modalHead={<h1 className="text-center text-black font-semibold">Chia sẻ</h1>}
                            modalBody={
                                <div>
                                    <div className="pl-4 py-2 mb-2 cursor-pointer hover:bg-gray-100">Facebook</div>
                                    <div className="pl-4 py-2 mb-2 cursor-pointer hover:bg-gray-100">Zalo</div>
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3">
                <div className="col-span-2 mt-2">
                    <Link to={`/article/${article.articleID}`} >
                        <h1 className="text-xl font-bold">
                            {article ? article.title : 'Authentication & Authorization trong ReactJS'}
                        </h1>
                    </Link>
                    <p className="text-[15px] mt-2 line-clamp-2">
                        {article ? article.description : 'Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền...'}
                    </p>
                    <div className="flex mt-3 justify-start items-center">
                        <div onClick={() => { handleSetCategoryAndPageNumber(article.category, 1); handleMoveScreenOnTop(); }} className="py-1 px-2 cursor-pointer font-semibold text-black text-sm bg-gray-200 rounded-full">
                            {(article && article.category && article.category.categoryName) ? article.category.categoryName : 'Blog'}
                        </div>
                        <p className="text-sm ml-4">
                            <span>
                                <FontAwesomeIcon color="gray" className="mr-2" icon={faCalendarDay} />
                                {article ? `${article.publishDate.split('.')[0].split('T')[0]}` : '01-01-2003'}
                            </span>
                            <span>
                                <FontAwesomeIcon color="gray" className="mr-2 ml-4" icon={faClock} />
                                {article ? `${article.publishDate.split('.')[0].split('T')[1]}` : '00:00:01'}
                            </span>
                        </p>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Link to={`/article/${article.articleID}`}>
                        <img alt="" src={article ? `https://localhost:7020/api/images/${article.imagePath}` : "/color.jpg"} className="w-[200px] h-[120px] max-w-[200px] max-h-[120px] rounded-xl"></img>
                    </Link>
                </div>
            </div>
        </div>
    </>)
}

export default ArticleCardXL;