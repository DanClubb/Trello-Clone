"use client"

import { useState } from "react";
import CreateBoardModal from "./CreateBoardModal";



export default function CreateBoardCard() {
    const [showCreateBoardModal, setShowCreateBoardModal] = useState(false)

    return (
        <>
            <div 
                className={`flex flex-col justify-center items-center gap-1 bg-lightgray text-sm shrink-0 w-[11.75rem] h-[6.25rem] rounded cursor-pointer transition hover:bg-lightgray/[0.3]`}
                onClick={() => setShowCreateBoardModal(true)}
            >
                <p>Create new baord</p>
                <span className="text-xl">+</span>
            </div> 
            {
                showCreateBoardModal && <CreateBoardModal setShowModal={setShowCreateBoardModal} />
            }
        </>
        
    )
}
