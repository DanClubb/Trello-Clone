"use client"

import { useState } from "react"

export default function AddList() {
    const [addListClicked, setAddListClicked] = useState(false)
    return (
        <>
        {
            addListClicked ? 
                <div className="p-2 w-[17rem] bg-black rounded-xl text-sm">
                    <input 
                        type="text" 
                        className="mb-2 px-3 py-2 w-full bg-transparent rounded outline-none ring-2 ring-inset ring-transparent transition hover:bg-gray-800 hover:ring-lightgray focus:bg-transparent focus:ring-skyblue" 
                        placeholder="Enter list title..." 
                    />
                    <div className="flex items-center gap-4">
                        <button className="px-3 p-1.5 bg-skyblue rounded text-slate-900 hover:bg-blue-300 transition">Add list</button>
                        <button onClick={() => setAddListClicked(false)}>x</button>
                    </div>
                </div>
                :
                <button 
                    className="px-4 py-3 w-[17rem] bg-slate-200/[0.3] rounded-xl text-white text-sm text-left hover:bg-slate-400/[0.4]"
                    onClick={() => setAddListClicked(true)}    
                >
                    + Add a list
                </button>
        }
        </>
        
    )
}
