import {useState} from "react";
import EditUserDropdown from "./UserDropdown.jsx";
function UserList({users}) {
    const userList = users;
    const [searchTerm, setSearchTerm] = useState("");
    const [searchBy, setSearchBy] = useState('username');
    return (
        <div className="mx-40 p-10 border-red-500 rounded-2xl">
            <h2>User List</h2>
            <form>  
                <b> Search By:</b>  
                <select id = "filter" onChange={(e) => {
                setSearchBy(e.target.value)}} value={searchBy}>   
                <option value='username'> username </option>  
                <option value='id'> id </option>  
                <option value='name'> name </option>  
                </select>
            </form>  
                <input className="border-2 mb-2 " type="text" placeholder="Search Users" onChange={(e) => {
                setSearchTerm(e.target.value)}} />
            <table className="w-full text-left  table-auto">
                <thead>
                    <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        Username
                    </th>
                    <th>
                        Name
                    </th>
                    <th>
                        Date Joined
                    </th>
                    </tr>
                </thead>
                <tbody>
            {userList.filter((user) => {
                switch(searchBy) {
                    case('username'): return user.username.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
                    case('id'): return user.id.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
                    case('name'): return user.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
                }})
            .map((user, index) => (
                <tr>
                    <td>
                        {user.id}
                    </td>
                    <td>
                        {user.username}
                    </td>
                    <td>
                        {user.name}
                    </td>
                    <td>
                        {user.created}
                    </td>
                    <td>
                        <button className="ml-auto" type="button"><EditUserDropdown _id={user.id}/></button>
                    </td>
                </tr>
                          
            ))}
            </tbody>
            </table>
        </div>
    );
}
export default UserList;