import { useTodos } from "../hooks/useTodos";
import TodoApp from "../components/TodoApp";

export default function TodoAppContainer() {
    const {
        todos,
        filteredTodos,
        remaining,
        filter,
        add,
        toggle,
        remove,
        clearCompleted,
        setFilter,
    } = useTodos();

    return (
        <TodoApp
            todos={todos}
            filteredTodos={filteredTodos}
            remaining={remaining}
            filter={filter}
            onAdd={add}
            onToggle={toggle}
            onRemove={remove}
            onClearCompleted={clearCompleted}
            onSetFilter={setFilter}
        />
    );
}
