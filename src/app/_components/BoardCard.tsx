import Link from "next/link";

type BoardCardProps = {
    boardName: string;
    boardColor: string;
}

export default function BoardCard({boardName, boardColor}: BoardCardProps) {
    return (
        <Link href={`/board/${boardName.split(' ').join('-').toLowerCase()}`} className={`px-4 py-2 ${boardColor} font-semibold shrink-0 w-[11.75rem] h-[6.25rem] rounded cursor-pointer`}>
            <h3 className="w-fit text-white backdrop-contrast-[0.85]">{boardName}</h3>
        </Link>
     
        
    )
}
