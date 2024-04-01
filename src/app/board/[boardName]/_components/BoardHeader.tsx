import Ellipsis from "~/app/_components/Ellipsis";

type BoardHeaderProps = {
    boardName: string;
}

export default function BoardHeader({boardName}: BoardHeaderProps) {
    return (
        <div className="flex items-center gap-4 mb-3 pl-8 pr-4 py-3 bg-black/[0.3] text-slate-100 font-bold">
            <h2 className="text-lg">{boardName}</h2>
            <button className="ml-auto px-3 py-2 bg-slate-200 rounded-sm text-slate-900 text-sm text-nowrap transition hover:bg-slate-50">+ Share</button>
        </div>
    )
}
