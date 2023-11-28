import { createSignal } from "solid-js";
import { format } from "date-fns";

const Profile = (props: any) => {
  const user = props.user;

  if (!user) {
    return (
      <div class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-4xl text-red-600 font-bold">404 - User Not Found</h1>
        <p class="text-lg mt-4">Sorry, the requested user does not exist.</p>
      </div>
    );
  }

  const [name, setName] = createSignal(user.name);
  const [email, setEmail] = createSignal(user.email);
  const [username, _] = createSignal(user.username);
  const [location, setLocation] = createSignal(user.location);
  const [bio, setBio] = createSignal(user.bio);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Profile data to submit:", {
      name: name(),
      email: email(),
      location: location(),
      bio: bio(),
    });
  };

  return (
    <div>
      <nav aria-label="Breadcrumb" class="p-6">
        <ol class="flex leading-none divide-x divide-red-400">
          <li class="pr-4">
            <a href="/users" class="text-red-500 hover:text-red-600">
              Users
            </a>
          </li>
          <li class="px-4 text-black" aria-current="page">
            {user.name}
          </li>
        </ol>
      </nav>

      <div class="flex">
        <div class="w-1/4 p-6 flex flex-col">
          <img
            src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
            alt="Profile Picture"
            class="rounded-lg border-2 border-red-500 mb-4"
          />
          <label for="name" class="block text-sm font-medium text-gray-700">
            Joined {format(new Date(user.created), 'MMMM d, yyyy')}
          </label>
        </div>

        <div class="w-3/4 p-6">
          <h2 class="text-2xl font-semibold mb-4">Profile Information</h2>
          <form onSubmit={handleSubmit} class="space-y-8">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">
                Name:
              </label>
              <input
                id="name"
                type="text"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 bg-gray-200 text-gray-500 cursor-not-allowed focus:outline-none focus:ring-0 focus:border-gray-300"
                value={name()}
                onInput={(e) => setName(e.target.value)}
                readOnly
              />
            </div>
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700">
                Username:
              </label>
              <input
                id="username"
                type="text"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 bg-gray-200 text-gray-500 cursor-not-allowed focus:outline-none focus:ring-0 focus:border-gray-300"
                value={username()}
                readonly
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                id="email"
                type="email"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 bg-gray-200 text-gray-500 cursor-not-allowed focus:outline-none focus:ring-0 focus:border-gray-300"
                value={email()}
                onInput={(e) => setEmail(e.target.value)}
                readOnly
              />
            </div>
            <div>
              <label for="location" class="block text-sm font-medium text-gray-700">
                Location:
              </label>
              <input
                id="location"
                type="text"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 bg-gray-200 text-gray-500 cursor-not-allowed focus:outline-none focus:ring-0 focus:border-gray-300"
                value={location()}
                onInput={(e) => setLocation(e.target.value)}
                readOnly
              />
            </div>
            <div>
              <label for="bio" class="block text-sm font-medium text-gray-700">
                Bio:
              </label>
              <textarea
                id="bio"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 bg-gray-200 text-gray-500 cursor-not-allowed focus:outline-none focus:ring-0 focus:border-gray-300"
                textContent={bio()}
                onInput={(e) => setBio(e.target.value)}
                readOnly
              />
            </div>
            {/* <button type="submit" class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Save Profile
            </button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
