import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPen, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import MyModal from "../../components/modal/MyModal";
import { useMycontext } from "../../components/project/context/MyContextProvider";
import { toast } from "react-toastify";
import { fetchChangePassword, fetchLogin } from "../../services/AuthService";

const ChangePassword = () => {
    const navigate = useNavigate();
    const { currentUser } = useMycontext();
    const [clickOptionPlus, setClickOptionPlus] = useState(false);

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [comfPassword, setComfPassword] = useState('');

    const [userNameErorr, setUserNameErorr] = useState('');
    const [passwordErorr, setPasswordErorr] = useState('');
    const [comfPasswordErorr, setComfPasswordErorr] = useState('');

    const validateUserName = () => {
        if (userName.trim() === '') {
            setUserNameErorr('Mật khẩu không được để trống');
            return false;
        }
        else if (userName.trim().length < 5) {
            setUserNameErorr('Mật khẩu phải có ít nhất 5 ký tự');
            return false;
        }
        // Add more conditions for username validation if needed
        setUserNameErorr('');
        return true;
    };

    const validatePassword = () => {
        if (password.trim() === '') {
            setPasswordErorr('Mật khẩu mới không được để trống');
            return false;
        } else if (password.trim().length < 5) {
            setPasswordErorr('Mật khẩu mới phải có ít nhất 5 ký tự');
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

    const handleClickOptionPlus = () => {
        setClickOptionPlus(false);
    }

    const handleChangePassword = async () => {
        const isUserNameValid = validateUserName();
        const isPasswordValid = validatePassword();
        const isComfPasswordValid = validateComfPassword();
        if (isUserNameValid && isPasswordValid && isComfPasswordValid) {
            let res = await fetchLogin(currentUser.username, userName);
            if (res.status === true) {
                const userID = res.data?.user?.userID;
                if (userID) {
                    let res = await fetchChangePassword(userID, password);
                    if (res.status === true) {
                        toast.success('Đổi mật khẩu thành công');
                        clearDataInput();
                    }
                    else {
                        toast.error(res.message);

                    }
                }
            }
            else {
                toast.error('Mật khẩu không đúng');
            }
        }
    }

    const clearErrorsFormLoginAndRegister = () => {
        setUserNameErorr('');
        setPasswordErorr('');
        setComfPasswordErorr('');
    };

    const clearDataInput = () => {
        setUserName('');
        setPassword('');
        setComfPassword('');
    };

    return (
        <div className="mt-4">
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

            <div className="flex justify-center items-center mt-20">
                <div className="w-[600px] border-2 p-28 rounded-2xl">
                    <div className="font-bold text-center text-3xl">Đổi mật khẩu</div>

                    <div className="mt-5">
                        <div className="font-semibold">Mật khẩu</div>
                        <input type="password" value={userName} onChange={(e) => { setUserName(e.target.value); clearErrorsFormLoginAndRegister(); }} className="w-full mt-2 border-2 px-[20px] py-[8px] rounded-full focus:border-orange-500" />
                        <div className="text-red-500 text-sm text-center mt-1">{userNameErorr}</div>
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold">Mật khẩu mới</div>
                        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); clearErrorsFormLoginAndRegister(); }} className="w-full mt-2 border-2 px-[20px] py-[8px] rounded-full focus:border-orange-500" />
                        <div className="text-red-500 text-sm text-center mt-1">{passwordErorr}</div>
                    </div>
                    <div className="mt-5">
                        <div className="font-semibold">Xác nhận mật khẩu mới</div>
                        <input type="password" value={comfPassword} onChange={(e) => { setComfPassword(e.target.value); clearErrorsFormLoginAndRegister(); }} className="w-full mt-2 border-2 px-[20px] py-[8px] rounded-full focus:border-orange-500" />
                        <div className="text-red-500 text-sm text-center mt-1">{comfPasswordErorr}</div>
                    </div>
                    <div onClick={() => handleChangePassword()} className="w-full mt-5 cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold text-white text-center py-[8px] rounded-full focus:border-orange-500 hover:opacity-80" >Lưu lại</div>
                </div>
            </div>

        </div>
    )
}

export default ChangePassword;