const Navbar = (props: any) => {
  const user = props.user;

  return (
    <nav class="bg-black border-b-2 border-black-200 px-4 py-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-evenly space-x-16">
          <a href="/" class="text-white hover:text-white">
            <img
              src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/111.png"
              alt="Logo"
              class="h-12 w-auto"
            />
          </a>
          <a href="/" class="text-white hover:text-white">
            Dashboard
          </a>
          <a href="/users" class="text-white hover:text-white">
            Users
          </a>
          <a href="/portfolio" class="text-white hover:text-white">
            Portfolios
          </a>
        </div>
        <div class="flex">
          {user ? (
            <div class="flex justify-center items-center">
              <a href={`/users/${user.id}`} class="text-white hover:text-white mr-4">
                <img
                  src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
                  alt="Profile Picture"
                  class="rounded-lg border-2 border-red-500 w-10 border-1"
                />
              </a>
              <div class="flex flex-col">
                <a href={`/users/${user.id}`} class="text-white hover:text-white">
                  {user.name}
                </a>
                <a href={`/logout`} class="text-white hover:text-white text-sm">Logout</a>
              </div>
            </div>
          ) : (
            <a href="/login" class="text-white hover:text-white">
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;