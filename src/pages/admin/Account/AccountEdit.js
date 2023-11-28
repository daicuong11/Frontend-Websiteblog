import { useEffect} from "react";
import { fetchGetUserById, changeInfUser, createUser} from "../../../services/UserService";
import { useParams } from 'react-router-dom'
import InputField from '../../../components/form-control/InputField';
import SelectField from '../../../components/form-control/SelectField';
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { useNavigate } from "react-router-dom";


const AccountEdit = () => {
    const navigate = useNavigate();
    const { userID } = useParams();
    const status = [{ id: true, name: 'Khóa' }, { id: false, name: 'Mở Khóa' }];
    const roles = [{ id: 'ADMIN', name: 'ADMIN' }, { id: 'EDITOR', name: 'EDITOR' }, { id: 'AUTHOR', name: 'AUTHOR' }, { id: 'GUEST', name: 'GUEST' }];
    const getUser = async () => {
        let res = await fetchGetUserById(userID);
        return res.data
    }

    useEffect(() => {
        if(userID) {
            getUser()
        }
    }, [userID, getUser])

    const schema = yup.object().shape({
        name: yup.string().required("Họ và tên là trường bắt buộc.").max(100).min(2),
        username: yup.string().required("Tên đăng nhập là trường bắt buộc").max(100).min(5),
        email: yup.string().email(),
        password: yup.string().required("Mật khẩu là trường bắt buộc").max(100).min(6),
        role: yup.string(),
        isLocked: yup.bool()
    });

    const form = useForm({
        defaultValues: async () => {
            if(userID) {
                return await getUser()
            } else {
                return {
                    "name": "",
                    "username": "",
                    "password": "",
                    "email": "",
                    "role": "",
                    "isLocked": ""
                }
            }
        }, 
        resolver: yupResolver(schema)
    })
    const onSubmit = async () => {
        if (userID) {
            const update = await changeInfUser(userID, form.getValues())
            if (update.status === true) {
                navigate("/admin");
            } else {
                console.log("Lỗi");
            }
        } else {
            const create = await createUser(form.getValues())
            if (create.status === true) {
                navigate("/admin");
            } else {
                console.log("Lỗi");
            }
        }
    }
    return (<>
        <div className="container mx-auto mt-5">
            <div className="row justify-center items-center">
                <div className="col">
                    <form className="bg-white p-6 rounded-lg" onSubmit={form.handleSubmit(onSubmit)}>
                        <h1 className="text-left text-2xl font-semibold text-black mb-4">THÔNG TIN TÀI KHOẢN</h1>
                        <div className="gap-6 grid grid-cols-2">
                            <div className="">
                                <label className="flex text-left mb-2">Username</label>
                                <InputField name="username" placeholder="Username..." form={form} />
                            </div>
                            <div>
                                <label className="flex text-left mb-2">Nhập tên</label>
                                <InputField name="name" placeholder="Họ và tên..." form={form} />
                            </div>
                            <div>
                                <label className="flex text-left mb-2">Nhập gmail</label>
                                <InputField name="email" placeholder="Địa chỉ gmail..." form={form} />
                            </div>
                            <div>
                                <label className="flex text-left mb-2">Mật khẩu</label>
                                <InputField name="password" placeholder="Mật khẩu..." type="password" form={form} />
                            </div>

                            <div>
                                <label className="flex text-left mb-2">Nhập lại mật khẩu</label>
                                <InputField name="confirmPassword" placeholder="Nhập lại mật khẩu..." type="password" form={form} />
                            </div>
                            <div >
                                <label className="flex text-left mb-2">Phân quyền</label>
                                <SelectField
                                    name="role" color='success' defaultValue="" defaultOption="Chọn quyền" menu={roles} form={form} defaultSelect="GUEST"
                                />
                            </div>
                            <div>
                                <label className="flex text-left mb-2">Trạng thái</label>
                                <SelectField
                                    name="isLocked" color='success' defaultValue="" defaultOption="Xét trạng thái" menu={status} form={form}
                                />
                            </div>
                        </div>

                        <div className="col-span-12 text-left mt-8">
                            <input type="submit" className="cursor-pointer bg-green-800 text-white inline-block px-10 py-1 rounded-lg text-lg" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>);
}

export default AccountEdit;