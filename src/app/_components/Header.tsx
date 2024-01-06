"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import logo from "../../../public/icon.png"
import CreateBoardModal from "./CreateBoardModal"

export default function Header() {
    const [showCreateBoardModal, setShowCreateBoardModal] = useState(false)
    return (
        <header>
            <nav className="flex items-center gap-10 py-2 px-4 h-12 border-solid border-b border-lightgray text-sm font-semibold">
                <Link href="/" className="flex items-center gap-2">
                    <Image src={logo} alt="logo" width={25} height={25} /> 
                    <h1 className="font-extrabold text-xl">Drello</h1>
                </Link>
                <ul className="flex items-center gap-8">
                    <li>Recent ▼</li>
                    <li>Starred ▼</li>
                </ul>
                <button 
                className="px-3 p-1.5 bg-skyblue rounded text-slate-900 hover:bg-blue-300 transition" 
                onClick={() => {setShowCreateBoardModal(true)}}
                >
                    Create
                </button>
            </nav>
            {
                showCreateBoardModal && <CreateBoardModal setShowModal={setShowCreateBoardModal} />
            }
        </header>
    )
}
