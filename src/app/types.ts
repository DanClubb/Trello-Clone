export type Lists = {
    boardId: number;
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
    position: number;
}

export type Tasks = {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
    position: number;
    listId: number;
    description: string | null;
}[]