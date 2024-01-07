export type Tasks = {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
    position: number;
    listId: number;
}[]