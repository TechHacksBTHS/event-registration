import Link from 'next/link';
import { useRouter } from "next/router";

const toggleNav = () => {
    document.getElementById("nav-content").classList.toggle("hidden");
}


const Nav = () => {

    const activeClasses = "px-3 py-2 sm:flex-grow rounded-md text-lg sm:text-sm font-medium leading-5 text-white bg-gray-900 focus:outline-none";
    const nonActiveClasses = "px-3 py-2 sm:flex-grow rounded-md text-lg sm:text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none";

    const router = useRouter();

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between min-h-full sm:h-16 py-3">
                    <div className="flex-1 flex flex-col sm:mt-1 sm:flex-row items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0">
                            <img className="block lg:hidden h-10 w-auto" src="https://techhacks.nyc/logo.svg" alt="TechHacks logo" />
                            <img className="hidden lg:block h-10 w-auto" src="https://techhacks.nyc/logo.svg" alt="TechHacks logo" />
                        </div>
                        
                        <div className="block absolute right-0 sm:hidden">
                            <button id="nav-toggle" className="flex items-center px-3 py-2 border rounded text-white border-white" onClick={() => toggleNav()}>
                                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                            </button>
                        </div>

                        <div id="nav-content" className="hidden sm:block sm:ml-6 w-4/5 sm:w-4">
                            <div className="flex flex-col sm:flex-row">
                                <Link href="/"><button className={router.pathname == "/" ? activeClasses : nonActiveClasses}>Home</button></Link>
                                <Link href="/events"><button className={router.pathname == "/events" ? activeClasses + " sm:ml-4" : nonActiveClasses + " sm:ml-4"}>Events</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;