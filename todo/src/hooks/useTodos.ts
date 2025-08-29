import { useEffect, useMemo, useReducer } from "react";
import type { Todo } from "../types";
import { Filter } from "../types";
import { loadTodos, saveTodos } from "../utils/storage";
import { newId } from "../utils/id";

type State = {
    todos: Todo[];
    filter: Filter;
};

type Action =
    | { type: "add"; title: string }
    | { type: "toggle"; id: string }
    | { type: "remove"; id: string }
    | { type: "clearCompleted" }
    | { type: "setFilter"; filter: Filter };

function reducer(state: State, action: Action): State {
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
        case "toggle": {
            return {
                ...state,
                todos: state.todos.map((t) =>
                    t.id === action.id ? { ...t, completed: !t.completed } : t
                ),
            };
        }
        case "remove": {
            return { ...state, todos: state.todos.filter((t) => t.id !== action.id) };
        }
        case "clearCompleted": {
            return { ...state, todos: state.todos.filter((t) => !t.completed) };
        }
        case "setFilter": {
            return { ...state, filter: action.filter };
        }
        default:
            return state;
    }
}

const initialState: State = {
    todos: loadTodos(),
    filter: Filter.All,
};

export function useTodos() {
    const [state, dispatch] = useReducer(reducer, initialState);

    // persist
    useEffect(() => {
        saveTodos(state.todos);
    }, [state.todos]);

    const remaining = useMemo(
        () => state.todos.filter((t) => !t.completed).length,
        [state.todos]
    );

    const filteredTodos = useMemo(() => {
        switch (state.filter) {
            case Filter.Active:
                return state.todos.filter((t) => !t.completed);
            case Filter.Completed:
                return state.todos.filter((t) => t.completed);
            default:
                return state.todos;
        }
    }, [state.todos, state.filter]);

    return {
        todos: state.todos,
        filteredTodos,
        filter: state.filter,
        remaining,
        add: (title: string) => dispatch({ type: "add", title }),
        toggle: (id: string) => dispatch({ type: "toggle", id }),
        remove: (id: string) => dispatch({ type: "remove", id }),
        clearCompleted: () => dispatch({ type: "clearCompleted" }),
        setFilter: (filter: Filter) => dispatch({ type: "setFilter", filter }),
    };
}
