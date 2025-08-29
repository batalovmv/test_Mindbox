import { Filter, Todo } from "../types";
import { newId } from "../utils/id";

export type State = { todos: Todo[]; filter: Filter };

export type Action =
    | { type: "add"; title: string }
    | { type: "toggle"; id: string }
    | { type: "remove"; id: string }
    | { type: "clearCompleted" }
    | { type: "setFilter"; filter: Filter };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "add": {
            const title = action.title.trim();
            if (!title) return state;
            const todo: Todo = {
                id: newId(),
                title,
                completed: false,
                createdAt: Date.now(),
            };
            return { ...state, todos: [todo, ...state.todos] };
        }
        case "toggle":
            return {
                ...state,
                todos: state.todos.map(t =>
                    t.id === action.id ? { ...t, completed: !t.completed } : t
                ),
            };
        case "remove":
            return { ...state, todos: state.todos.filter(t => t.id !== action.id) };
        case "clearCompleted":
            return { ...state, todos: state.todos.filter(t => !t.completed) };
        case "setFilter":
            return { ...state, filter: action.filter };
        default:
            return state;
    }
};

export const initialState = (seed: Todo[] = []): State => ({
    todos: seed,
    filter: Filter.All,
});

export const selectRemaining = (todos: Todo[]) =>
    todos.filter(t => !t.completed).length;

export const selectFiltered = (todos: Todo[], filter: Filter) => {
    switch (filter) {
        case Filter.Active: return todos.filter(t => !t.completed);
        case Filter.Completed: return todos.filter(t => t.completed);
        default: return todos;
    }
};
