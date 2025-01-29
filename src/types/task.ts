export type TaskSchema = {
    id: string;
    categoryId: string;
    userId: string;
    name: string;
    description?: string;
    status: "pending" | "completed" | "in-progress";
    isImportant: boolean;
    createdAt: string;
    updatedAt?: string;
}