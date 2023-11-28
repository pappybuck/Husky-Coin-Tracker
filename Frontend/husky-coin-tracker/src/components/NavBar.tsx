import "./styles.css";

const Navbar = (props: any) => {
  const user = props.user;

  return (
    <nav class="bg-black border-b-2 border-black-200 px-4 py-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-evenly space-x-16">
          <a href="/" class="hct-navbar-link">
            <img
              src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/111.png"
              alt="Logo"
              class="h-12 w-auto"
            />
          </a>
          <a href="/dashboard" class="hct-navbar-link">
            Dashboard
          </a>
          <a href="/users" class="hct-navbar-link">
            Users
          </a>
          <a href="/portfolio" class="hct-navbar-link">
            Portfolios
          </a>
        </div>
        <div class="flex">
          {user ? (
            <div class="flex justify-center items-center">
              <a href={`/users/${user.id}`} class="hct-navbar-link mr-4">
                <img
                  src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
                  alt="Profile Picture"
                  class="hct-navbar-image w-10 border-1"
                />
              </a>
              <div class="flex flex-col">
                <a href={`/users/${user.id}`} class="hct-navbar-link">
                  {user.name}
                </a>
                <a href={`/logout`} class="hct-navbar-link text-sm">Logout</a>
              </div>
            </div>
          ) : (
            <a href="/login" class="hct-navbar-link">
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
