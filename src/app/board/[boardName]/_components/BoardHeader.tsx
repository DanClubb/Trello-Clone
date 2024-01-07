import Ellipsis from "~/app/_components/Ellipsis";

type BoardHeaderProps = {
    boardName: string;
}

export default function BoardHeader({boardName}: BoardHeaderProps) {
    return (
        <div className="flex items-center gap-4 mb-3 px-8 py-3 bg-black/[0.3] text-slate-100 font-bold">
            <h2 className="text-lg">{boardName}</h2>
            <div className="text-lg">✩</div>
            <button className="ml-auto px-3 py-2 bg-slate-200 rounded-sm text-slate-900 text-sm transition hover:bg-slate-50">+ Share</button>
            <Ellipsis width={24} height={24} />
        </div>
    )
}
