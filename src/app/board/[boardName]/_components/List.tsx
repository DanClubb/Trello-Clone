type ListProps = {
    listName: string
}

export default async function List({listName}: ListProps) {
    const tasks: string[] = []
    return (
        <div className="p-2 min-w-[17rem] h-fit bg-black rounded-xl text-sm">
            <h3 className="px-3 py-2 font-bold">{listName}</h3>
            <div className="min-h-2">
                {tasks.map(task => <div></div>)}
            </div>
            <div className="flex items-center gap-4">
                <button type="submit" className="px-3 py-2 w-full rounded text-left hover:bg-slate-300/[0.3] transition">+ Add a card</button>
            </div>
        </div>
    )
}

