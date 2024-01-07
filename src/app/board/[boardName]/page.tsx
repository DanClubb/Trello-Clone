import BoardCanvas from "./_components/BoardCanvas"
import BoardSideBar from "./_components/BoardSideBar"

export default async function page({params} : {params: {boardName: string}}) {
    return (
        <div className="flex">
            <BoardSideBar boardName={params.boardName} />
            <BoardCanvas boardName={params.boardName} />
        </div>
    )
}
