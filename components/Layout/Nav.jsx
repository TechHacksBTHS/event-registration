import Link from 'next/link';
import { useRouter } from "next/router";
import { signInWithGoogleOAuth, signOut } from "../../services/frontend/authentication";
import { useAuth } from "../../contexts/AuthContext";

const toggleNav = () => {
    document.getElementById("nav-content").classList.toggle("hidden");
}

const Nav = () => {

    const activeClasses = "px-3 py-2 sm:flex-grow rounded-md text-lg sm:text-sm font-medium leading-5 text-black bg-gray-200 focus:outline-none";
    const nonActiveClasses = "px-3 py-2 sm:flex-grow rounded-md text-lg sm:text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none";

    const router = useRouter();
    const { user } = useAuth();

    return (
        <nav className="bg-black">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between min-h-full sm:h-16 py-3">
                    <div className="flex-1 flex flex-col sm:mt-1 sm:flex-row items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0">
                            <img className="block lg:hidden h-10 w-auto" src="/logo.svg" alt="TechHacks logo" />
                            <img className="hidden lg:block h-10 w-auto" src="/logo.svg" alt="TechHacks logo" />
                        </div>
                        
                        <div className="block absolute right-0 sm:hidden">
                            <button id="nav-toggle" className="flex items-center px-3 py-2 border rounded text-white border-white" onClick={() => toggleNav()}>
                                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                            </button>
                        </div>

                        <div id="nav-content" className="hidden sm:block sm:ml-6 w-4/5 sm:w-4">
                            <div className="flex flex-col sm:flex-row">
                                <Link href="/"><button className={router.pathname == "/" ? activeClasses : nonActiveClasses}>Home</button></Link>
                                { user ? <Link href="/dashboard/overview"><button className={router.pathname.includes("/dashboard") ? activeClasses + " sm:ml-4" : nonActiveClasses + " sm:ml-4"}>Dashboard</button></Link> : null}
                                <Link href="/events"><button className={router.pathname === "/events" ? activeClasses + " sm:ml-4" : nonActiveClasses + " sm:ml-4"}>Events</button></Link>
                            </div>
                        </div>

                        {/* Sign In with Google */}
                        <div className="block sm:absolute sm:right-0 sm:block text-white">
                            <div className="flex flex-col sm:flex-row">
                                { user == null ? 
                                <button onClick={ async () => await signInWithGoogleOAuth()} className={nonActiveClasses}>Sign In</button> : 
                                    <button onClick={ async () => await signOut()} className={nonActiveClasses + " flex items-center"}>
                                        <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
                                            <path
                                                d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012
                                                2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2
                                                0 012-2h9z"></path>
                                        </svg>
                                        <span className="mx-2">Log Out</span>
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;