import Board from "./_components/Board"
import BoardNav from "./_components/BoardNav"

export default async function page({params} : {params: {boardName: string}}) {
    return (
        <div className="flex">
            <BoardNav />
            <Board boardName={params.boardName} />
        </div>
    )
}
