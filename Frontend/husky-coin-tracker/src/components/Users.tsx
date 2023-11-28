import { createSignal } from "solid-js";
import "./styles.css";

interface User {
  id: string;
  name: string;
}

const Users = (props: any) => {
  const [searchTerm, setSearchTerm] = createSignal("");
  const [filteredUsers, setFilteredUsers] = createSignal<User[]>([]);;

  const users: User[] = props.users;

  const handleSearch = (event: any) => {
    event.preventDefault();
    console.log("Searching for:", searchTerm());
  };

  const updateFilteredUsers = (searchValue: string) => {
    const filtered = users.filter((user: any) =>
      user.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredUsers(filtered);
    console.log(filteredUsers()); // Log to check if the list is updating
    console.log(searchValue); // Log to check if the list is updating
  };

  return (
    <div class="mt-4 justify-center h-screen">
      <form onSubmit={handleSearch} class="w-full px-4 md:px-10 lg:px-20">
        <div class="mt-1">
          <input
            id="search"
            type="text"
            class="hct-textbox w-full text-xl p-4"
            placeholder="Enter a username"
            value={searchTerm()}
            onInput={(e) => {
              setSearchTerm(e.target.value);
              updateFilteredUsers(e.target.value);
            }}
          />
        </div>
      </form>
      <div class="suggestions">
        {filteredUsers().map(user => (<div>{user.name}</div>))}
      </div>
    </div>
  );
};

export default Users;
