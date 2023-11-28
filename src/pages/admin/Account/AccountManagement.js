import TableUser from "../../../components/project/table/TableUser";
import { useEffect, useRef, useState } from "react";
import { fetchGetAll, fetchGetUserById } from "../../../services/UserService";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight, faPlus } from '@fortawesome/free-solid-svg-icons'
import MyPagination from "../../../components/project/panigation/MyPanigation";
const UserManagement = () => {
    const [listUsers, setListUsers] = useState([]);
    const [pageSize, setPageSize] = useState(4); 
    const [totalItem, setTotalItem] = useState(0);
    const [pagesNumber, setPagesNumber] = useState(0);
    const searchRef = useRef()
    useEffect(() => {
        getListUsers();
    }, []);
    const getListUsers = async (keyword, page = 1) => {
        let res = await fetchGetAll(keyword, page);
        // neu thanh cong
        // luu thong tin pagination
        // set data
        if(res.status === true){
            setPageSize(res.pageSize);
            setPagesNumber(res.pageNumber)
            setTotalItem(res.totalItem)
            setListUsers(res.data);
        }
    }
    const handleSearch = (page = 1) => {
        const keyword = searchRef.current.value
        getListUsers(keyword, page);
    }
    const onPageChange = (page) => {
        handleSearch(page)
    }
    return (<>
        <div className="container mx-auto mt-5">
            <div className="row justify-center items-center">
                <div className="col">
                    <div className="flex items-center">
                        <Link to="/admin/user/add" className="bg-green-700 text-lg text-white px-3 py-1 border rounded-lg my-5 mt-6 items-center w-1/6">
                            <FontAwesomeIcon className="pr-2 text-sm" icon={faPlus} />
                            Thêm tài khoản mới
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <input ref={searchRef} className="px-3 border outline-none py-1" placeholder="Tìm kiếm ở đây" />
                        <button onClick={() => handleSearch()} className="px-3 py-1 border bg-green-700 text-white">Tìm kiếm</button>
                    </div>
                    <TableUser
                        listUsers={listUsers}
                        onReload={getListUsers}
                    />
                    <MyPagination
                        totalPages={Math.ceil(totalItem/pageSize)}
                        currentPage={pagesNumber}
                        pageSize={pageSize}
                        onPageChange={onPageChange} 
                    />
                </div>
            </div>
        </div>
    </>);
}

export default UserManagement;