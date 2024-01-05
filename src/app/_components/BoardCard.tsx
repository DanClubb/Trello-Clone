import Link from "next/link";

type BoardCardProps = {
    boardName: string;
}

export default function BoardCard({boardName}: BoardCardProps) {
    return (
        <Link href={`/board/${boardName.split(' ').join('-').toLowerCase()}`} className={`px-4 py-2 bg-red-800 font-semibold shrink-0 w-[11.75rem] h-[6.25rem] rounded cursor-pointer`}>
            <h3>{boardName}</h3>
        </Link>
     
        
    )
}
