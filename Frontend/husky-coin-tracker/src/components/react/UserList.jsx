import { useState } from "react";
function UserList({ users }) {
    const userList = users;
    const [searchTerm, setSearchTerm] = useState("");
    const [searchBy, setSearchBy] = useState('username');
    return (
        <div className="mx-40 p-10 rounded-2xl">
            <form className="mb-2">
                <b> Search By:</b>
                <select className="ml-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" id="filter" onChange={(e) => {
                    setSearchBy(e.target.value)
                }} value={searchBy}>
                    <option value='username'> username </option>
                    <option value='id'> id </option>
                    <option value='name'> name </option>
                </select>
            </form>
            <form className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg height="16" width="16" viewBox="0 0 512 512">
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                </span>
                <input className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" type="text" placeholder="Search Users" onChange={(e) => {
                    setSearchTerm(e.target.value)
                }} /> </form>

            <table className="w-full text-left mt-10 table-auto border rounded-lg shadow-sm text-left rtl:text-right">
                <thead className="text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className="px-6 py-3">
                            ID
                        </th>
                        <th className="px-6 py-3">
                            Username
                        </th>
                        <th className="px-6 py-3">
                            Name
                        </th>
                        <th className="px-6 py-3">
                            Date Joined
                        </th>
                        <th className="px-6 py-3">
                            Admin
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {userList.filter((user) => {
                        switch (searchBy) {
                            case ('username'): return user.username.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
                            case ('id'): return user.id.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
                            case ('name'): return user.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
                        }
                    })
                        .map((user, index) => (
                            <tr key={index} className="bg-white border-b">
                                <td className="px-6 py-3">
                                    {user.id}
                                </td>
                                <td className="px-6 py-3">
                                    {user.username}
                                </td>
                                <td className="px-6 py-3">
                                    {user.name}
                                </td>
                                <td className="px-6 py-3">
                                    {user.created}
                                </td>
                                <td className="px-6 py-3">
       
                                    {!user.isAdmin &&
                                    <form
                                    method="POST"
                                    className="space-y-8 mb-4"
                                    acceptCharset="UTF-8"
                                    encType="multipart/form-data"
                                    ><button type="submit" name="id" value={user.id} className="bg-red-600 hover:bg-red-700 text-white py-2 px-20 rounded">Set Admin</button></form>}
                                    {user.isAdmin && <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            </div>}
                                </td>
                                <td className="px-6 py-3 flex justify-end">
                                    <a href={"/profile/" + user.id} className="bg-red-600 hover:bg-red-700 text-white py-2 px-20 rounded">
                                        Edit User
                                    </a>
                                </td>
                            </tr>

                        ))}
                </tbody>
            </table>
        </div>
    );
}
export default UserList;
