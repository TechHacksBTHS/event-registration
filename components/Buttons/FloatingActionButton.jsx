import React from 'react'

export default function FloatingActionButton({ action }) {
    return (
        <div className="fixed bottom-0 right-0 flex items-center justify-center w-16 h-16 m-4 text-3xl text-center text-white transition duration-200 ease-in bg-black rounded-full shadow-lg shadow-xl lg:hidden hover:bg-gray-900 active:shadow-lg mouse focus:outline-none">
            <button className="w-16 h-16 rounded-full focus:outline-none" onClick={action}>
                <i className="fi fi-sr-menu-dots"></i>
            </button>
        </div>
    )
}
