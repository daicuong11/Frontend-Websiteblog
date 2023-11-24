import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import MySearch from '../search/MySearch';
import MyModal from "../../components/modal/MyModal";
import { useEffect, useState } from "react";
import ArticleCard from "../project/article/ArticleCard";
import NotifyCard from "../project/notify/NotifyCard";
import { fetchCreateNewArticle, fetchGetAllArticleByUserID } from "../../services/ArticleService";
import { useMycontext } from "../project/context/MyContextProvider";
import { toast } from "react-toastify";
import { fetchGetUserByJWT, fetchLogin } from "../../services/AuthService";
import { fetchGetAllCategory } from "../../services/CategoryService";
import axiosInstance from "../../services/customize-axios";
import { fetchCreateNewContent } from "../../services/ContentService";

const Categorys = {
    blog: "blog",
    entertainment: 'Giải trí'
}
const Header = ({ isShowSearch, isShowBtnPublish, nav }) => {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser, listDataContent, setListDataContent, isModalOpenLogin, setIsModalOpenLogin, isUnauthorized, setUnauthorized, resetUnauthorized } = useMycontext();
    const [isOpenOptions, setIsOpenOptions] = useState(false);
    const [isOpenNotify, setIsOpenNotify] = useState(false);
    const [isOpenMyArticle, setIsOpenMyArticle] = useState(false);
    const [myArticles, setMytArticles] = useState([]);
    const [showModalCreateArticle, setShowModalCreateArticle] = useState(false);
    const [listCategory, setListCategory] = useState([]);

    //in lỗi
    // console.log(isUnauthorized);
    // console.log(currentUser);

    //register
    const [isModalOpenRegister, setIsModalOpenRegister] = useState(false);
    //modal login

    const handleLogin = async () => {
        let res = await fetchLogin(userName, password);
        if (res.status) {
            localStorage.setItem('token', res.data.token);
            resetUnauthorized();
            setCurrentUser(res.data.user);
            toast.success(`Xin chào ${res.data.user.name}`);
            handleCloseModal();
            return;
        }
        toast.error(res.message);
        handleCloseModal(false);
    };

    const handleLogout = () => {
        if (localStorage.getItem('token'))
            localStorage.removeItem('token');
        setUnauthorized();
        setCurrentUser(null);
        // toast.success(`Đăng xuất thành công`);
        handleOnCloseOptions();
    };

    const handleCloseModal = () => {
        // Close the login modal without logging in
        clearErrorsFormLoginAndRegister();
        clearDataFormLoginAndRegister();
        setIsModalOpenLogin(false);
    };

    //close handle login

    //Bài viết
    const [articleTitle, setArticleTitle] = useState('');
    const [articleDescription, setArticleDescription] = useState('');
    const [articleImage, setArticleImage] = useState('');

    //category

    // Lấy danh sách categories từ database
    const getListCategory = async () => {
        let res = await fetchGetAllCategory();
        setListCategory(res.data);
    }
    //validator
    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [comfPassword, setComfPassword] = useState('');

    //error message
    const [fullNameErorr, setFullNameErorr] = useState('');
    const [userNameErorr, setUserNameErorr] = useState('');
    const [passwordErorr, setPasswordErorr] = useState('');
    const [comfPasswordErorr, setComfPasswordErorr] = useState('');

    const clearErrorsFormLoginAndRegister = () => {
        setFullNameErorr('');
        setUserNameErorr('');
        setPasswordErorr('');
        setComfPasswordErorr('');
    };

    const clearDataFormLoginAndRegister = () => {
        setFullName('');
        setUserName('');
        setPassword('');
        setComfPassword('');
    };


    const validateFullName = () => {
        if (fullName.trim() === '') {
            setFullNameErorr('Họ và tên không được để trống');
            return false;
        }
        else if (fullName.trim().length < 4) {
            setFullNameErorr('Họ và tên quá ngắn');
            return false;
        }
        setFullNameErorr('');
        return true;
    };
    const validateUserName = () => {
        if (userName.trim() === '') {
            setUserNameErorr('Tên người dùng không được để trống');
            return false;
        }
        // Add more conditions for username validation if needed
        setUserNameErorr('');
        return true;
    };

    const validatePassword = () => {
        if (password.trim() === '') {
            setPasswordErorr('Mật khẩu không được để trống');
            return false;
        } else if (password.trim().length < 6) {
            setPasswordErorr('Mật khẩu phải có ít nhất 6 ký tự');
            return false;
        }
        // Add more conditions for password validation if needed
        setPasswordErorr('');
        return true;
    };

    const validateComfPassword = () => {
        if (comfPassword.trim() === '') {
            setComfPasswordErorr('Xác nhận mật khẩu không được để trống');
            return false;
        } else if (comfPassword !== password) {
            setComfPasswordErorr('Mật khẩu xác nhận không khớp');
            return false;
        }
        setComfPasswordErorr('');
        return true;
    };

    const handleSubmitFormLoginOrRegister = () => {
        const isFullNameValid = validateFullName();
        const isUserNameValid = validateUserName();
        const isPasswordValid = validatePassword();
        const isComfPasswordValid = validateComfPassword();
        if (!isModalOpenRegister) {
            if (isUserNameValid && isPasswordValid) {
                handleLogin();
            } else {
                // Form is not valid, handle accordingly (e.g., show error messages)

            }
        }
        else {
            if (isFullNameValid && isUserNameValid && isPasswordValid && isComfPasswordValid) {
                toast.success('Đăng ký')
            } else {

            }
        }
    };

    //validate xuất bản form
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

    useEffect(() => {
        if (currentUser && currentUser.userID) {
            getListArticlesByUserID(currentUser.userID);
        }
        //get categories
        getListCategory();
    }, [isOpenMyArticle]);

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

        //value
        console.log(currentUser)
        const categoryID = listCategory.find(c => c.categoryName.toLowerCase() === Categorys[window.location.href.split('/').pop()].toLowerCase())?.categoryID;

        if (isTitleValid && isDescriptionValid && isImageValid) {
            if (!categoryID) {
                toast.success('Xuất bản thất bại do categoryID');
                handleCloseModalCreateNewArticle();
                return;
            }
            else if (!currentUser.userID) {
                toast.success('Xuất bản thất bại do userID', currentUser.userID);
                handleCloseModalCreateNewArticle();
                return;
            }

            const newArticle = {
                Title: articleTitle,
                Description: articleDescription,
                Image: articleImage,
                Status: 'PENDING',
                categoryID: categoryID,
                content: listDataContent
            }
            let res = await fetchCreateNewArticle(articleTitle, articleDescription, articleImage, 'PENDING', currentUser.userID, categoryID);
            if (res.status === true) {
                const newArticleID = res.data.articleID;
                await listDataContent.forEach(async content => {
                    let response = await fetchCreateNewContent(content.title, content.body, content.image, content.id, newArticleID);
                })
                setListDataContent([]);
                toast.success('Xuất bản thành công');
                handleCloseModalCreateNewArticle();
                navigate(`/article/${newArticleID}`);
                return;
            }
            toast.error('Xuất bản thất bại');
            handleCloseModalCreateNewArticle();
            // console.log(newArticle);
        } else {
            // handleCloseModalCreateNewArticle();
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

    // console.log(isUnauthorized);

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
                    {!isUnauthorized ?

                        <div className='flex items-center'>
                            {/* Button xuất bản */}
                            {
                                isShowBtnPublish
                                &&
                                <div>
                                    <button onClick={() => { setShowModalCreateArticle(!showModalCreateArticle) }} className={`py-1.5 px-4 ${listDataContent.length > 0 ? ' cursor-pointer bg-orange-600 hover:bg-orange-500' : ' cursor-default bg-orange-600 opacity-50'} rounded-full text-white mr-4 text-sm font-semibold`}>Xuất bản</button>
                                    <MyModal
                                        onOpen={showModalCreateArticle}
                                        onClose={handleCloseModalCreateNewArticle}
                                        className={'w-[652px] left-[calc(50%-652px/2)] transition-all top-[calc(20%/2)] z-[1000] bg-white'}
                                        modalHead={(<div className="text-center font-semibold text-xl">
                                            Tạo bài viết
                                        </div>)}
                                        modalBody={(<div className="px-4">
                                            <hr />
                                            <div className="mb-5">
                                                <div className="my-5">
                                                    <div className="font-semibold">Tên bài viết</div>
                                                    <input type="text" value={articleTitle} onChange={(e) => { setArticleTitle(e.target.value); setTitleError(''); }} className="w-full mt-2 border-2 px-[16px] py-[6px] rounded-md focus:border-orange-500" />
                                                    <div className="text-red-500 text-sm">{titleError}</div>
                                                </div>
                                                <div className="my-5">
                                                    <div className="font-semibold">Mô tả</div>
                                                    <textarea
                                                        style={{ height: `${articleDescription.split('\n').length * 40}px` }}
                                                        type="text"
                                                        value={articleDescription}
                                                        onChange={(e) => { setArticleDescription(e.target.value); setDescriptionError(''); }}
                                                        className="w-full mt-2 border-2 px-[16px] py-[6px] h-auto rounded-md focus:border-orange-500"
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
                            {/* bài viết của tôi */}
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
                                            {
                                                myArticles.length === 0 && <div className="text-center text-orange-600 mb-4">Bạn chưa đăng bài viết nào.</div>
                                            }
                                        </div>
                                    }
                                />
                            </div>
                            {/* Thông báo */}
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
                            {/* Thông tin tài khoản */}
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
                                            <div className="text-base font-semibold truncate ml-3">{currentUser && currentUser.name}</div>
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
                                                <button onClick={() => handleLogout()} className="w-full text-left hover:text-black text-gray-500 cursor-pointer text-sm py-[10px]">Đăng xuất</button>
                                            </div>
                                        </div>
                                    }
                                />
                            </div>
                        </div>
                        :
                        // { Đăng nhập đăng ký}
                        <div className="flex items-center">
                            <div onClick={() => { setIsModalOpenLogin(!isModalOpenLogin); setIsModalOpenRegister(false); }} className="text-sm font-semibold py-[7px] px-5 cursor-pointer rounded-full mr-4">
                                Đăng nhập
                            </div>
                            <div onClick={() => { setIsModalOpenLogin(!isModalOpenLogin); setIsModalOpenRegister(true); }} className="text-sm font-semibold py-[7px] px-5 cursor-pointer bg-gradient-to-r from-orange-400 to-orange-500 rounded-full text-white hover:from-orange-300 hover:to-orange-400">
                                Đăng ký
                            </div>

                            {/* Modal login, register */}
                            <MyModal
                                onOpen={isModalOpenLogin}
                                onClose={handleCloseModal}
                                showIconClose={true}
                                className={'left-[calc(50%-500px/2)] transition-all top-[calc(20%/2)] min-w-[500px] bg-white'}
                                modalHead={<div></div>}
                                modalBody={
                                    isModalOpenRegister ?
                                        <div className="w-full mb-2 py-10 px-20">
                                            <div className="font-bold text-center text-3xl">Đăng ký</div>
                                            <div className="mt-5">
                                                <div className="font-semibold">Họ và tên</div>
                                                <input type="text" value={fullName} onChange={(e) => { setFullName(e.target.value); clearErrorsFormLoginAndRegister(); }} className="w-full mt-2 border-2 px-[20px] py-[8px] rounded-full focus:border-orange-500" />
                                                <div className="text-red-500 text-sm text-center mt-1">{fullNameErorr}</div>
                                            </div>
                                            <div className="mt-5">
                                                <div className="font-semibold">Tên tài khoản</div>
                                                <input type="text" value={userName} onChange={(e) => { setUserName(e.target.value); clearErrorsFormLoginAndRegister(); }} className="w-full mt-2 border-2 px-[20px] py-[8px] rounded-full focus:border-orange-500" />
                                                <div className="text-red-500 text-sm text-center mt-1">{userNameErorr}</div>
                                            </div>
                                            <div className="mt-5">
                                                <div className="font-semibold">Mật khẩu</div>
                                                <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); clearErrorsFormLoginAndRegister(); }} className="w-full mt-2 border-2 px-[20px] py-[8px] rounded-full focus:border-orange-500" />
                                                <div className="text-red-500 text-sm text-center mt-1">{passwordErorr}</div>
                                            </div>
                                            <div className="mt-5">
                                                <div className="font-semibold">Nhập lại mật khẩu</div>
                                                <input type="password" value={comfPassword} onChange={(e) => { setComfPassword(e.target.value); clearErrorsFormLoginAndRegister(); }} className="w-full mt-2 border-2 px-[20px] py-[8px] rounded-full focus:border-orange-500" />
                                                <div className="text-red-500 text-sm text-center mt-1">{comfPasswordErorr}</div>
                                            </div>
                                            <div onClick={() => handleSubmitFormLoginOrRegister()} className="w-full mt-5 cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold text-white text-center py-[8px] rounded-full focus:border-orange-500 hover:opacity-80" >Đăng ký</div>
                                            <p className="text-center text-sm mt-5">Bạn đã có tài khoản? <span onClick={() => { setIsModalOpenRegister(false); clearErrorsFormLoginAndRegister() }} className="text-orange-600 font-semibold cursor-pointer">Đăng nhập</span></p>
                                        </div>
                                        :
                                        <div className="w-full mb-2 py-10 px-20">
                                            <div className="font-bold text-center text-3xl">Đăng nhập</div>
                                            <div className="mt-5">
                                                <div className="font-semibold">Tên tài khoản</div>
                                                <input type="text" value={userName} onChange={(e) => { setUserName(e.target.value); clearErrorsFormLoginAndRegister(); }} className="w-full mt-2 border-2 px-[20px] py-[8px] rounded-full focus:border-orange-500" />
                                                <div className="text-red-500 text-sm text-center mt-1">{userNameErorr}</div>
                                            </div>
                                            <div className="mt-5">
                                                <div className="font-semibold">Mật khẩu</div>
                                                <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); clearErrorsFormLoginAndRegister(); }} className="w-full mt-2 border-2 px-[20px] py-[8px] rounded-full focus:border-orange-500" />
                                                <div className="text-red-500 text-sm text-center mt-1">{passwordErorr}</div>
                                            </div>
                                            <div onClick={() => handleSubmitFormLoginOrRegister()} className="w-full mt-5 cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold text-white text-center py-[8px] rounded-full focus:border-orange-500 hover:opacity-80" >Đăng nhập</div>
                                            <p className="text-center text-sm mt-5">Bạn chưa có tài khoản? <span onClick={() => { setIsModalOpenRegister(true); clearErrorsFormLoginAndRegister() }} className="text-orange-600 font-semibold cursor-pointer">Đăng ký</span></p>
                                        </div>
                                }
                            />
                        </div>
                    }
                </div>

            </div>
        </header >
    );
}

export default Header;
