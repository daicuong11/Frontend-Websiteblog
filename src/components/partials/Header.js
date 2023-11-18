import { Link } from "react-router-dom";
import "./Header.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import MySearch from '../search/MySearch';
import MyModal from "../../components/modal/MyModal";
import { useState } from "react";
import ArticleCard from "../project/article/ArticleCard";
import NotifyCard from "../project/notify/NotifyCard";

const Header = (props) => {

    const [isOpenOptions, setIsOpenOptions] = useState(false);
    const [isOpenNotify, setIsOpenNotify] = useState(false);
    const [isOpenMyArticle, setIsOpenMyArticle] = useState(false);

    const handleOnCloseOptions = () => {
        setIsOpenOptions(false);
    }

    const handleOnCloseNotify = () => {
        setIsOpenOptions(false);
    }

    const handleOnCloseMyArtilce = () => {
        setIsOpenMyArticle(false);
    }

    return (
        <header className="bg-white h-[66px] header fixed top-0 left-0 right-0">
            <div className="nav px-7 grid grid-cols-3 justify-between items-center h-full mx-auto">
                <div className="header-nav-logo flex items-center">
                    <Link className="cursor-pointer" to={"/"}>
                        <img alt="" className="w-[38px] h-[38px] rounded-[6px]" src="/color.jpg"></img>
                    </Link>
                    <div className='back text-[12px] font-semibold flex items-center py-4 pl-4 text-gray-400 cursor-pointer'>
                        <FontAwesomeIcon icon={faChevronLeft} className='icon-back mr-1 w-[6.25px] h-[10px]' />
                        <span className="uppercase">Quay lại</span>
                    </div>
                </div>
                <div className="header-nav-search flex justify-center items-center">
                    <MySearch />
                </div>
                <div className="header-nav-actions flex justify-end">
                    <div className='flex items-center'>
                        <div onClick={() => setIsOpenMyArticle(!isOpenMyArticle)}>
                            <button className='p-1.5 mr-4 cursor-pointer text-sm font-semibold text-black hover:text-slate-500'>Bài viết của tôi</button>
                            <MyModal
                                onOpen={isOpenMyArticle}
                                onClose={handleOnCloseMyArtilce}
                                className={'right-[120px] top-14 w-[380px] bg-white'}
                                // modalHead={
                                //     <div className="flex justify-between items-center">
                                //         <h1 className="text-lg font-semibold">Bài viết của tôi</h1>
                                //         <p className="text-sm text-orange-500 cursor-pointer py-1 px-2 rounded hover:bg-slate-100">Xem tất cả</p>
                                //     </div>
                                // }
                                templateHead={{ title: 'Bài viết của tôi', action: 'Xem tất cả' }}
                                modalBody={
                                    <div className="overflow-y-auto max-h-[460px] mb-2">
                                        <ArticleCard />
                                        <ArticleCard />
                                        <ArticleCard />
                                        <ArticleCard />
                                        <ArticleCard />
                                        <ArticleCard />
                                        <ArticleCard />
                                        <ArticleCard />
                                        <ArticleCard />
                                        <ArticleCard />
                                        <ArticleCard />
                                    </div>
                                }
                            />
                        </div>
                        <div onClick={() => setIsOpenNotify(!isOpenNotify)}>
                            <div className='p-1 cursor-pointer text-slate-500 hover:text-slate-900'>
                                <FontAwesomeIcon icon={faBell} size='lg' />
                            </div>
                            <MyModal
                                onOpen={isOpenNotify}
                                onClose={handleOnCloseNotify}
                                className={'right-[76px] top-14 w-[400px] bg-white'}
                                // modalHead={
                                //     <div className="flex justify-between items-center">
                                //         <h1 className="text-lg font-semibold">Thông báo</h1>
                                //         <p className="text-sm text-orange-500 cursor-pointer">Đánh dấu đã đọc</p>
                                //     </div>
                                // }
                                templateHead={{ title: 'Thông báo', action: 'Đánh dấu đã đọc' }}
                                modalBody={
                                    <div className="overflow-y-auto max-h-[460px]">
                                        <NotifyCard />
                                        <NotifyCard />
                                        <NotifyCard />
                                        <NotifyCard />
                                        <NotifyCard />
                                        <NotifyCard />
                                    </div>
                                }
                                textModalFoot={"Xem tất cả thông báo"}
                            />
                        </div>
                        <div onClick={() => setIsOpenOptions(!isOpenOptions)}>
                            <img alt="" src='/color.jpg' className='ml-3 w-8 h-8 rounded-full cursor-pointer'></img>
                            <MyModal
                                onOpen={isOpenOptions}
                                onClose={handleOnCloseOptions}
                                className={'right-7 top-14 w-[230px] bg-white'}
                                modalHead={
                                    <div className="flex items-center">
                                        <div>
                                            <img className="w-[50px] h-[50px] max-w-[50px] max-h-[50px] rounded-full" alt="" src={'/color.jpg'}></img>
                                        </div>
                                        <div className="text-base font-semibold truncate ml-3">Đại Cương</div>
                                    </div>
                                }
                                modalBody={
                                    <div className="px-6">
                                        <hr className="mb-2"></hr>
                                        <div className="mb-2">
                                            <button className="w-full text-left hover:text-black text-gray-500 cursor-pointer text-sm py-[10px]">Trang cá nhân</button>
                                        </div>
                                        <hr className="mb-2"></hr>
                                        <div className="">
                                            <button className="w-full text-left hover:text-black text-gray-500 cursor-pointer text-sm py-[10px]">Viết bài</button>
                                        </div>
                                        <div className="mb-2">
                                            <button className="w-full text-left hover:text-black text-gray-500 cursor-pointer text-sm py-[10px]">Bài viết của tôi</button>
                                        </div>
                                        <hr className="mb-2"></hr>
                                        <div className="mb-2">
                                            <button className="w-full text-left hover:text-black text-gray-500 cursor-pointer text-sm py-[10px]">Bài viết đã lưu</button>
                                        </div>
                                        <hr className="mb-2"></hr>
                                        <div className="">
                                            <button className="w-full text-left hover:text-black text-gray-500 cursor-pointer text-sm py-[10px]">Cài đặt</button>
                                        </div>
                                        <div className="mb-2">
                                            <button className="w-full text-left hover:text-black text-gray-500 cursor-pointer text-sm py-[10px]">Đăng xuất</button>
                                        </div>
                                    </div>
                                }
                            />
                        </div>
                    </div>
                </div>

            </div>
        </header>
    );
}

export default Header;
