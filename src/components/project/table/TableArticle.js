import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import InputField from '../../../components/form-control/InputField';
import { fetchGetAllArticle, changeArticleStatus } from "../../../services/ArticleService";
import SelectField from '../../../components/form-control/SelectField';
import { useForm } from 'react-hook-form';
const MyTable = ({ listArticle, onReload }) => {
    const navigate = useNavigate();
    const status = [{ id: 1, name: 'DRAFT' }, { id: 2, name: 'PENDING' }, { id: 3, name: 'PUBLISHED' }, { id: 4, name: 'DELETED' }, { id: 5, name: 'REJECTED' }];
    const changeStatus = async (articles, status) => {
        articles.status = status
        const res = await changeArticleStatus(articles.articleID, articles)
        await onReload()
    }
    return (
        <div className="container mx-auto my-8 overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 text-center divide-y divide-gray-200">
                <thead>
                    <tr className="divide-x">
                        <th className="py-2 px-4 bg-gray-200 border-b">ID</th>
                        <th className="py-2 px-4 bg-gray-200 border-b"><p class="" style={{width: "300px" }}>Tiêu đề</p></th>
                        <th className="py-2 px-4 bg-gray-200 border-b">Trạng thái</th>
                        <th className="py-2 px-4 bg-gray-200 border-b">Ngày đăng</th>
                        <th className="py-2 px-4 bg-gray-200 border-b">Người đăng bài</th>
                        <th className="py-2 px-4 bg-gray-200 border-b">Danh mục</th>
                        <th className="py-2 px-4 bg-gray-200 border-b"><p class="" style={{width: "100px" }}></p></th>
                    </tr>
                </thead>
                <tbody>
                    {listArticle && listArticle.length > 0 &&
                        listArticle.map((articles, index) => {
                            return (
                                <tr key={`user-${index}`} className="divide-x">
                                    <td className="py-2 px-4 border-b">{articles.articleID}</td>
                                    <td onClick={() => navigate(`/article/${articles.articleID}`)} className="py-2 px-4 border-b cursor-pointer hover:underline hover:text-orange-500" ><p style={{  width: "300px" }}>{articles.title}</p></td>
                                    <td className="py-2 px-4 border-b"><p style={{  width: "100px" }}>{articles.status}</p></td>
                                    <td className="py-2 px-4 border-b">{`${articles.publishDate.split('.')[0].split('T')[0]}  ${articles.publishDate.split('.')[0].split('T')[1]}`}</td>
                                    <td onClick={() => navigate(`/user/info/${articles.user?.userID}`)} className="py-2 px-4 border-b cursor-pointer hover:underline hover:text-orange-500">{articles.user?.name}</td>
                                    <td className="py-2 px-4 border-b">{articles.category?.categoryName}</td>
                                    <td className="py-2 px-4 border-b"><p style={{  width: "200px" }}></p>
                                        {/* <SelectField
                                            name="status" color='success' defaultValue="" defaultOption="Trạng thái" menu={status} form={form} defaultSelect="PENDING" onChange={() => changeStatus({ ...articles })}
                                        /> */}
                                        <SelectForm 
                                            name={'status'+index}
                                            statusList={status}
                                            articles={articles}
                                            changeStatus={changeStatus}
                                        />
                                        {/* <span className='ml-1 inline-block px-3 text-green-800 bg-green-300 bg-opacity-20 border border-green-800 rounded-lg cursor-pointer'>
                                            <Link to={`/admin/articles/edit/${articles.articleID}`}>Sửa</Link>
                                        </span> */}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default MyTable;

const SelectForm = ({name, articles, changeStatus, statusList}) => {
    const form = useForm({
        defaultValues: {
            [name]: "",
        },
    })
    return <>
        <SelectField
            name={name} color='success' defaultValue="" defaultOption="Trạng thái" menu={statusList} form={form} defaultSelect="PENDING" onChange={() => changeStatus({ ...articles },form.getValues(name))} /></>
}