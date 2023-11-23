import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import MySearch from '../search/MySearch';
import MyModal from "../../components/modal/MyModal";
import { useEffect, useState } from "react";
import ArticleCard from "../project/article/ArticleCard";
import NotifyCard from "../project/notify/NotifyCard";
import { fetchGetAllArticleByUserID } from "../../services/ArticleService";
import { useContext } from "react";
import { MyContext } from "../project/context/MyContextProvider";
import { toast } from "react-toastify";
import { fetchGetUserByJWT } from "../../services/AuthService";
import { fetchGetAllCategory } from "../../services/CategoryService";

const Header = ({ isShowSearch, isShowBtnPublish, nav }) => {
    const navigate = useNavigate();
    const { listDataContent} = useContext(MyContext);
    const [isOpenOptions, setIsOpenOptions] = useState(false);
    const [isOpenNotify, setIsOpenNotify] = useState(false);
    const [isOpenMyArticle, setIsOpenMyArticle] = useState(false);
    const [myArticles, setMytArticles] = useState([]);
    const [showModalCreateArticle, setShowModalCreateArticle] = useState(false);
    const [listCategory, setListCategory] = useState([]);


    //User
    const [user, setUser] = useState();
    const tokenJWT = localStorage.getItem('token');

    

    //Bài viết
    const [articleTitle, setArticleTitle] = useState('');
    const [articleDescription, setArticleDescription] = useState('');
    const [articleImage, setArticleImage] = useState('');

    //category
    // useEffect(() => {
    //     getListCategory();
    // }, []);

    // // Lấy danh sách categories từ database
    // const getListCategory = async () => {
    //     let res = await fetchGetAllCategory();
    //     setListCategory(res.data);
    // }

    // const categoryID = listCategory.find(c => c.categoryName.toLowerCase() === window.location.href.split('/').pop())?.categoryID;
    // // console.log(categoryID);
    
    //validator
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [imageError, setImageError] = useState('');

    const validateTitle = () => {
        if (articleTitle.trim() === '') {
            setTitleError('Tên bài viết không được để trống');
            return false;
        }
        setTitleError('');
        return true;
    };

    const validateDescription = () => {
        if (articleDescription.trim() === '') {
            setDescriptionError('Mô tả không được để trống');
            return false;
        }
        setDescriptionError('');
        return true;
    };

    const validateImage = () => {
        if (!articleImage) {
            setImageError('Hình ảnh không được để trống');
            return false;
        }
        setImageError('');
        return true;
    };

    //giả sử userID hiện tại = 1 [Chỗ này nào làm Authentication jwt thì mới lấy userID]
    useEffect(() => {
        if (tokenJWT) {
            handleGetUserByJwtToken();
        }
    }, []);

    //get user by jwt token
    const handleGetUserByJwtToken = async () => {
        let res = await fetchGetUserByJWT();
        console.log(res);
    };

    const userID = 1;

    useEffect(() => {
        getListArticlesByUserID(userID);
    }, [isOpenMyArticle, userID]);
    
    //Lấy tất cả Article của user 
    const getListArticlesByUserID = async (id) => {
        let res = await fetchGetAllArticleByUserID(id);
        if (res.status === true) {
            setMytArticles(res.data);
        }
    }

    const handleOnCloseOptions = () => {
        setIsOpenOptions(false);
    }

    const handleOnCloseNotify = () => {
        setIsOpenOptions(false);
    }

    const handleOnCloseMyArtilce = () => {
        setIsOpenMyArticle(false);
    }

    //handle close modal create a new article
    const handleCloseModalCreateNewArticle = () => {
        setShowModalCreateArticle(false);
        setArticleTitle('');
        setArticleDescription('');
        setArticleImage(null);
    }

    //Create a new article
    const handleClickCreateArticle = async () => {
        const isTitleValid = validateTitle();
        const isDescriptionValid = validateDescription();
        const isImageValid = validateImage();

        if (isTitleValid && isDescriptionValid && isImageValid) {
            toast.success('Xuất bản thành công');
            const newArticle = {
                Title: articleTitle,
                Description: articleDescription,
                Image: articleImage,
                Status: 'PENDING',
                // categoryID: categoryID,
            }
            console.log(newArticle);
        } else {

        }
    };

    //
    const handleImageChange = (e) => {
        setArticleImage(e.target.files[0]);
        setImageError('');
    };

    //handle drag and drop image
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFiles = e.dataTransfer.files;

        if (droppedFiles.length > 0) {
            const droppedImage = droppedFiles[0];
            setArticleImage(droppedImage);
            setImageError('');
        }
    };

    //
    const backgroundImageStyle = {
        backgroundImage: articleImage
            ? `url(${URL.createObjectURL(articleImage)})`
            : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "200px",
    };

    return (
        <header className="bg-white h-[66px] header fixed top-0 left-0 right-0 z-[9999]">
            <div className="nav px-7 grid grid-cols-3 justify-between items-center h-full mx-auto">
                <div className="header-nav-logo flex items-center">
                    <Link className="cursor-pointer" to={"/"}>
                        <img alt="" className="w-[38px] h-[38px] rounded-[6px]" src="/color.jpg"></img>
                    </Link>
                    <div onClick={() => navigate(-1)} className='back text-[12px] font-semibold flex items-center py-4 pl-4 text-gray-400 cursor-pointer'>
                        <FontAwesomeIcon icon={faChevronLeft} className='icon-back mr-1 w-[6.25px] h-[10px]' />
                        <span className="uppercase">Quay lại</span>
                    </div>
                </div>
                <div className="header-nav-search flex justify-center items-center">
                    {isShowSearch && <MySearch />}
                </div>
                <div className="header-nav-actions flex justify-end">
                    <div className='flex items-center'>
                        {nav}

                        {
                            isShowBtnPublish
                            &&
                            <div>
                                <button onClick={() => { setShowModalCreateArticle(!showModalCreateArticle) }} className={`py-1.5 px-4 ${listDataContent.length > 0 ? ' cursor-pointer bg-orange-600 hover:bg-orange-500' : ' cursor-default bg-orange-600 opacity-50'} rounded-full text-white mr-4 text-sm font-semibold`}>Xuất bản</button>
                                <MyModal
                                    onOpen={showModalCreateArticle}
                                    onClose={handleCloseModalCreateNewArticle}
                                    className={'w-[652px] top-[80px] left-[400px] z-[1000] bg-white'}
                                    modalHead={(<div className="text-center font-semibold">
                                        Tạo bài viết
                                    </div>)}
                                    modalBody={(<div className="px-4">
                                        <hr />
                                        <div className="mb-5">
                                            <div className="my-5">
                                                <div className="font-semibold">Tên bài viết</div>
                                                <input type="text" value={articleTitle} onChange={(e) => { setArticleTitle(e.target.value); setTitleError(''); }} className="w-full mt-2 border-2 px-[16px] py-[6px] rounded focus:border-orange-500" />
                                                <div className="text-red-500 text-sm">{titleError}</div>
                                            </div>
                                            <div className="my-5">
                                                <div className="font-semibold">Mô tả</div>
                                                <textarea
                                                    style={{ height: `${articleDescription.split('\n').length * 40}px` }}
                                                    type="text"
                                                    value={articleDescription}
                                                    onChange={(e) => { setArticleDescription(e.target.value); setDescriptionError(''); }}
                                                    className="w-full mt-2 border-2 px-[16px] py-[6px] h-auto rounded focus:border-orange-500"
                                                />
                                                <div className="text-red-500 text-sm">{descriptionError}</div>
                                            </div>
                                            <div className="mt-5">
                                                <div className="font-semibold">Hình ảnh</div>
                                                <div className="mt-2 w-full h-200">
                                                    <div
                                                        className={`import-img w-full h-full ${articleImage ? "hover:bg-gray-200" : "bg-gray-100"
                                                            }`}
                                                        style={backgroundImageStyle}
                                                        onDragOver={handleDragOver}
                                                        onDrop={handleDrop}
                                                    >
                                                        <label
                                                            htmlFor="imageInput"
                                                            className="w-full h-full cursor-pointer flex flex-col justify-center items-center"
                                                        >
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                id="imageInput"
                                                                hidden
                                                                onChange={handleImageChange}
                                                            />
                                                            <p className="text-center text-sm text-gray-500 mb-2">
                                                                Thêm một ảnh đại diện hấp dẫn sẽ giúp bài viết của bạn cuốn hút
                                                                hơn với độc giả.
                                                            </p>
                                                            <p className="text-center text-sm text-orange-600">
                                                                Kéo thả ảnh vào đây, hoặc bấm để chọn ảnh
                                                            </p>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="text-red-500 text-sm">{imageError}</div>
                                            </div>

                                            <div className="mt-5">
                                                <div className="flex justify-between items-center">
                                                    <div></div>
                                                    <button onClick={() => handleClickCreateArticle()} className="px-[16px] py-[6px] bg-green-600 text-white rounded-md">
                                                        Xuất bản ngay
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)}
                                />
                            </div>
                        }

                        <div onClick={() => setIsOpenMyArticle(!isOpenMyArticle)}>
                            <button className='p-1.5 mr-4 cursor-pointer text-sm font-semibold text-black hover:text-slate-500'>Bài viết của tôi</button>
                            <MyModal
                                onOpen={isOpenMyArticle}
                                onClose={handleOnCloseMyArtilce}
                                className={'right-[120px] top-14 min-w-[380px] bg-white'}
                                templateHead={{ title: 'Bài viết của tôi', action: 'Xem tất cả' }}
                                modalBody={
                                    <div className="overflow-y-auto max-w-[380px] max-h-[460px] mb-2">
                                        {myArticles && myArticles.map((article, index) => {

                                            return (

                                                <ArticleCard
                                                    key={`article-${index}`}
                                                    article={article}
                                                />
                                            )
                                        })}
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
        </header >
    );
}

export default Header;
