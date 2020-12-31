import React from 'react'

export default function SmallSucessAlert({content, toggle}) {
    return (
        <div class="text-white fixed right-0 bottom-0 m-8 px-6 py-4 border-0 rounded mb-4 bg-green-500">
            <span class="inline-block align-middle mr-8">
                <b class="capitalize">Success!</b> {content}
            </span>
            <button onClick={() => toggle()} class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none">
                <span>×</span>
            </button>
        </div>
    )
}
