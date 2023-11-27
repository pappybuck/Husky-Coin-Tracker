import { createSignal } from "solid-js";
import "./styles.css";

const Profile = () => {
  const [name, setName] = createSignal("Bryce Erickson");
  const [email, setEmail] = createSignal("test@northeastern.edu");
  const [location, setLocation] = createSignal("Boston, MA");
  const [bio, setBio] = createSignal("CS @ Northeastern");

  const handleSubmit = (event) => {
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
            Bryce Erickson
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
            Joined November 27th, 2023
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
              />
            </div>
            <button type="submit" class="hct-button">
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
