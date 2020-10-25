const Nav = () => {
    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex-shrink-0">
                        <img className="block lg:hidden h-10 w-auto" src="https://techhacks.nyc/logo.svg" alt="TechHacks logo" />
                        <img className="hidden lg:block h-10 w-auto" src="https://techhacks.nyc/logo.svg" alt="TechHacks logo" />
                    </div>
                    <div className="hidden sm:block sm:ml-6">
                        <div className="flex">
                            <a href="#" className="px-3 py-2 rounded-md text-sm font-medium leading-5 text-white bg-gray-900">Dashboard</a>
                            <a href="#" className="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700">Events</a>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </nav>
    );
}

export default Nav;