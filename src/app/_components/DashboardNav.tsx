export default function DashboardNav() {
    const sharedClasses = 'relative pl-8 py-2 cursor-pointer transition'
    return (
        <div>
            <ul className="flex flex-col gap-1 pt-5 w-64 text-sm">
                <li className={`${sharedClasses} w-full bg-blue-800/[0.3] rounded-lg text-blue-400`}>Boards</li>
                <li className={`${sharedClasses} flex justify-between pr-3 
                                rounded-lg overflow-hidden group hover:bg-slate-500/[0.5]`}>
                    Members 
                    <span className="absolute right-0 translate-x-4 transition duration-300 group-hover:-translate-x-4">►</span>
                    <span className="transition duration-300 group-hover:-translate-x-8">+</span> 
                </li>
                <li className={`${sharedClasses} hover:bg-slate-500/[0.5] rounded-lg overflow-hidden group`}>
                    Settings 
                    <span className="absolute right-0 translate-x-4 transition duration-300 group-hover:-translate-x-4">►</span>
                </li>
            </ul>
        </div>
    )
}
