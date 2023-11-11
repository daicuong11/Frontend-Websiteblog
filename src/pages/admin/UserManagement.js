import TableUser from "../../components/project/table/TableUser";
import { useEffect, useState } from "react";
import { fetchGetAll } from "../../services/UserService";

const UserManagement = () => {
    const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        getListUsers();
    }, []);

    const getListUsers = async () => {
        let res = await fetchGetAll();
        setListUsers(res.data);
    }

    return (<>
        <div className="container mx-auto mt-5">
            <div className="row justify-center items-center">
                <div className="col">
                    <h1 className="text-red-800 bg-red-300 rounded cursor-pointer p-3 text-center hover:bg-red-400 uppercase">Danh sách người dùng</h1>

                    <TableUser
                    listUsers={listUsers}
                    />
                </div>
            </div>
        </div>
    </>);
}

export default UserManagement;