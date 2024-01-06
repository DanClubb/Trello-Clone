import BoardCanvas from "./_components/BoardCanvas"
import BoardNav from "./_components/BoardNav"

export default async function page({params} : {params: {boardName: string}}) {
    return (
        <div className="flex">
            <BoardNav boardName={params.boardName} />
            <BoardCanvas boardName={params.boardName} />
        </div>
    )
}
