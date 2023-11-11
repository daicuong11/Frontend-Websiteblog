import React from "react";

const MyTable = ({ listUsers }) => {
    return (
        <div className="container mx-auto my-8">
            <table className="min-w-full bg-white border border-gray-300 text-center border-collapse">
                <thead>
                    <tr className="divide-x">
                        <th className="py-2 px-4 bg-gray-200 border-b">STT</th>
                        <th className="py-2 px-4 bg-gray-200 border-b">Name</th>
                        <th className="py-2 px-4 bg-gray-200 border-b">Username</th>
                        <th className="py-2 px-4 bg-gray-200 border-b">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers &&
                        listUsers.map((user, index) => {
                            return (
                                <tr key={`user-${index}`} className="divide-x">
                                    <td className="py-2 px-4 border-b">{index + 1}</td>
                                    <td className="py-2 px-4 border-b">{user.name}</td>
                                    <td className="py-2 px-4 border-b">{user.username}</td>
                                    <td className="py-2 px-4 border-b">{user.role}</td>
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
