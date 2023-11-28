import React from "react";
import { Link } from "react-router-dom";
import { lockUser, deleteUser } from "../../../services/UserService";
const MyTable = ({ listUsers, onReload }) => {
    const doLockUser = async (id) => {
        await lockUser(id)
        // reload data
        await onReload()
    }
    const doDeleteUser = async (id) => {
        await deleteUser(id)
        // reload data
        await onReload()
    }
    return (
        <div className="container mx-auto my-8">
            <table className="min-w-full bg-white border border-gray-300 text-center border-collapse">
                <thead>
                    <tr className="divide-x">
                        <th className="py-2 px-4 bg-gray-200 border-b">ID</th>
                        <th className="py-2 px-4 bg-gray-200 border-b">Name</th>
                        <th className="py-2 px-4 bg-gray-200 border-b">Username</th>
                        <th className="py-2 px-4 bg-gray-200 border-b">Email</th>
                        <th className="py-2 px-4 bg-gray-200 border-b">IsLock</th>
                        <th className="py-2 px-4 bg-gray-200 border-b">Role</th>
                        <th className="py-2 px-4 bg-gray-200 border-b"></th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((user, index) => {
                            return (
                                <tr key={`user-${index}`} className="divide-x">
                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                    <td className="py-2 px-4 border-b">{user.name}</td>
                                    <td className="py-2 px-4 border-b">{user.username}</td>
                                    <td className="py-2 px-4 border-b">{user.email}</td>
                                    <td className="py-2 px-4 border-b">{user.isLocked == true ? "true" : "false"}</td>
                                    <td className="py-2 px-4 border-b">{user.role}</td>
                                    <td className="py-2 px-4 border-b">
                                        <span className="mr-1 inline-block px-3 text-red-800 bg-red-300 bg-opacity-20 border border-red-800 rounded-lg cursor-pointer" onClick={() => doDeleteUser(user.userID)}>Xóa</span>
                                        {user.isLocked == false && <span className="mr-1 inline-block px-3 text-blue-700 bg-blue-300 bg-opacity-20 border border-blue-800 rounded-lg cursor-pointer" onClick={() => doLockUser(user.userID)}>Khóa</span>}
                                        {user.isLocked && <span className="mr-1 inline-block px-3 text-blue-700 bg-blue-300 bg-opacity-20 border border-blue-800 rounded-lg cursor-pointer" onClick={() => doLockUser(user.userID)}>Mở khóa</span>}
                                        <span className='ml-1 inline-block px-3 text-green-800 bg-green-300 bg-opacity-20 border border-green-800 rounded-lg cursor-pointer'>
                                            <Link to={`/admin/user/edit/${user.userID}`}>Sửa</Link>
                                        </span>
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
