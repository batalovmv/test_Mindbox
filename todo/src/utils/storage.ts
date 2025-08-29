import { STORAGE_KEY } from "../constants";
import type { Todo } from "../types";

export function loadTodos(): Todo[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const data = JSON.parse(raw) as unknown;
        if (!Array.isArray(data)) return [];
        // лёгкая валидация
        return data
            .filter(
                (t: any) =>
                    t &&
                    typeof t.id === "string" &&
                    typeof t.title === "string" &&
                    typeof t.completed === "boolean" &&
                    typeof t.createdAt === "number"
            )
            .map((t) => ({ ...t })) as Todo[];
    } catch {
        return [];
    }
}

export function saveTodos(todos: Todo[]): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
        // молча игнорируем quota/privatemode
    }
}
