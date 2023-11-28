import { createSignal } from "solid-js";
import { format } from "date-fns";
import "./styles.css";

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
            class="hct-image mb-4"
          />
          <label for="name" class="hct-label">
            Joined {format(new Date(user.created), 'MMMM d, yyyy')}
          </label>
        </div>

        <div class="w-3/4 p-6">
          <h2 class="hct-header mb-4">Profile Information</h2>
          <form onSubmit={handleSubmit} class="space-y-8">
            <div>
              <label for="name" class="hct-label">
                Name:
              </label>
              <input
                id="name"
                type="text"
                class="hct-textbox"
                value={name()}
                onInput={(e) => setName(e.target.value)}
                readOnly
              />
            </div>
            <div>
              <label for="username" class="hct-label">
                Username:
              </label>
              <input
                id="username"
                type="text"
                class="hct-textbox"
                value={username()}
                readonly
              />
            </div>
            <div>
              <label for="email" class="hct-label">
                Email:
              </label>
              <input
                id="email"
                type="email"
                class="hct-textbox"
                value={email()}
                onInput={(e) => setEmail(e.target.value)}
                readOnly
              />
            </div>
            <div>
              <label for="location" class="hct-label">
                Location:
              </label>
              <input
                id="location"
                type="text"
                class="hct-textbox"
                value={location()}
                onInput={(e) => setLocation(e.target.value)}
                readOnly
              />
            </div>
            <div>
              <label for="bio" class="hct-label">
                Bio:
              </label>
              <textarea
                id="bio"
                class="hct-textbox"
                textContent={bio()}
                onInput={(e) => setBio(e.target.value)}
                readOnly
              />
            </div>
            {/* <button type="submit" class="hct-button">
              Save Profile
            </button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
