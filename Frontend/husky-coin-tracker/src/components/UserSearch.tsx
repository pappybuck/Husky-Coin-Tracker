import { createSignal, createEffect, For } from "solid-js";

interface User {
    id: string;
    name: string;
    username: string;
    avatar: string;
}

const UserSearch = (props: any) => {
    const hostname = import.meta.env.PUBLIC_POCKETBASE_HOST;

    const [searchTerm, setSearchTerm] = createSignal("");
    const [filteredUsers, setFilteredUsers] = createSignal<User[]>([]);

    createEffect(() => {
        const searchValue = searchTerm().toLowerCase();
        const filtered = props.users
            .filter((user: User) => user.name.toLowerCase().includes(searchValue))
            .slice(0, 24);
        setFilteredUsers(filtered);
    });

    const handleSearch = (event: Event) => {
        event.preventDefault();
    };

    return (
        <div class="min-h-screen">
            <header class="text-center p-6">
                <h1 class="text-4xl font-bold text-gray-700">User Search</h1>
            </header>

            <div class="container mx-auto p-4">
                <form onSubmit={handleSearch} class="w-full max-w-md mx-auto mb-6">
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                            <button
                                type="submit"
                                class="p-1 focus:outline-none focus:shadow-outline"
                            >
                                <svg height="16" width="16" viewBox="0 0 512 512">
                                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                                </svg>
                            </button>
                        </span>
                        <input
                            id="search"
                            type="text"
                            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                            placeholder="Enter a name..."
                            value={searchTerm()}
                            onInput={(e) => setSearchTerm(e.currentTarget.value)}
                        />
                    </div>
                </form>

                <div
                    class={
                        filteredUsers().length > 0
                            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                            : ""
                    }
                >
                    <For each={filteredUsers()}>
                        {(user) => (
                            <a
                                href={`/users/${user.id}`}
                                class="block bg-gray-50 rounded-lg shadow hover:shadow-md p-4"
                            >
                                <div class="flex items-center space-x-3">
                                    <img
                                        src={
                                            user.avatar
                                                ? `${hostname}/api/files/_pb_users_auth_/${user.id}/${user.avatar}?token=`
                                                : "default_pfp.jpeg"
                                        }
                                        alt="Profile Picture"
                                        class="h-12 w-12 rounded-full object-cover border border-red-600"
                                    />
                                    <div>
                                        <p class="text-lg font-semibold text-gray-800">
                                            {user.name}
                                        </p>
                                        <p class="text-sm text-gray-500">{user.username}</p>
                                    </div>
                                </div>
                            </a>
                        )}
                    </For>
                </div>
            </div>
        </div>
    );
};

export default UserSearch;
