import { createSignal } from "solid-js";
import "./styles.css";

const Users = () => {
  const [searchTerm, setSearchTerm] = createSignal("");

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("Searching for:", searchTerm());
  };

  return (
    <div class="flex mt-4 justify-center h-screen">
      <form onSubmit={handleSearch} class="w-full px-4 md:px-10 lg:px-20">
        <div class="flex mt-1">
          <input
            id="search"
            type="text"
            class="hct-textbox w-full text-xl p-4"
            placeholder="Enter a username"
            value={searchTerm()}
            onInput={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default Users;
