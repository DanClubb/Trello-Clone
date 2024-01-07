type TaskProps = {
    taskName: string;
}

export default function Task({taskName}: TaskProps) {
    return (
        <div className="mb-2 px-3 py-2 w-full max-h-40 bg-charcoal rounded-lg text-xs leading-5 outline-none transition overflow-y-auto">
            {taskName}
        </div>
    )
}
