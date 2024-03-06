import { api } from "~/trpc/server";
import AddList from "./AddList";
import List from "./List";

type BoardContentProps = {
    boardId: number
}

export default async function BoardContent({boardId}: BoardContentProps) {
    const serverLists = await api.list.getAll.query({boardId})
    const serverTasks = await api.task.getAll.query({boardId})

    return (
            <div className="flex gap-4 px-3 grow max-h-[calc(100%-6.75rem)] overflow-auto">
                {serverLists?.map((list, index) => (<List key={index} list={list} tasks={serverTasks}/>))}
                <AddList boardId={boardId} numOfLists={serverLists?.length ?? 0} />
            </div>   
    )
}
