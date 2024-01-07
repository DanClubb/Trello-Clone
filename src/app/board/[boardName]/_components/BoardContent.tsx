import { api } from "~/trpc/server";
import AddList from "./AddList";
import List from "./List";

type BoardContentProps = {
    boardId: number
}

export default async function BoardContent({boardId}: BoardContentProps) {
    const lists = (await api.list.getAll.query({boardId})).sort((a, b) => a.position - b.position)
    return (
        <div className="flex gap-4 px-3 grow max-h-[calc(100%-6.75rem)] overflow-auto">
            {
                lists.map((list) => (<List listName={list.name} listId={list.id} />))
            }
            <AddList boardId={boardId} numOfLists={lists.length} />
        </div>
    )
}
