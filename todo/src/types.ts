export type TodoId = string;

export interface Todo {
    id: TodoId;
    title: string;
    completed: boolean;
    createdAt: number;
}

export enum Filter {
    All = "all",
    Active = "active",
    Completed = "completed",
}
