import Image from "next/image"
import logo from "../../../public/icon.png"

export default function Header() {
    return (
        <header>
            <nav className="flex items-center gap-6 py-2 px-4 border-solid border-b border-lightgray text-sm font-semibold">
                <div className="flex items-center gap-2">
                    <Image src={logo} alt="logo" width={25} height={25} /> 
                    <h1 className="font-extrabold text-xl">Drello</h1>
                </div>
                <ul className="flex items-center gap-8">
                    <li>Recent ▼</li>
                    <li>Starred ▼</li>
                </ul>
                <button className="px-3 p-1.5 bg-skyblue rounded text-slate-900 hover:bg-blue-300 hover:transition">Create</button>
            </nav>
        </header>
    )
}
