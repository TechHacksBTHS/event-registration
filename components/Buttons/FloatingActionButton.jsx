import React from 'react'

export default function FloatingActionButton({ action }) {
    return (
        <div className="fixed bottom-0 right-0 m-10 bg-black text-white rounded-full text-3xl h-16 w-16 flex justify-center items-center text-center lg:hidden">
            <button className="focus:outline-none" onClick={action}>
                <i className="fi fi-sr-menu-dots"></i>
            </button>
        </div>
    )
}
