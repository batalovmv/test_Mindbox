import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoApp from "./TodoApp";
import { Filter, Todo } from "../types";

const items: Todo[] = [
    { id: "1", title: "A", completed: false, createdAt: 1 },
    { id: "2", title: "B", completed: true, createdAt: 2 },
];

test("wires callbacks and renders footer", async () => {
    const user = userEvent.setup();
    const onAdd = jest.fn();
    const onToggle = jest.fn();
    const onRemove = jest.fn();
    const onClearCompleted = jest.fn();
    const onSetFilter = jest.fn();

    render(
        <TodoApp
            todos={items}
            filteredTodos={items}
            remaining={1}
            filter={Filter.All}
            onAdd={onAdd}
            onToggle={onToggle}
            onRemove={onRemove}
            onClearCompleted={onClearCompleted}
            onSetFilter={onSetFilter}
        />
    );

    expect(screen.getByText("Осталось: 1")).toBeInTheDocument();

    // добавление
    await user.type(screen.getByPlaceholderText("Что нужно сделать?"), "New task");
    await user.keyboard("{Enter}");
    expect(onAdd).toHaveBeenCalledWith("New task");

    // фильтры
    await user.click(screen.getByRole("button", { name: "Активные" }));
    expect(onSetFilter).toHaveBeenCalledWith(Filter.Active);

    // очистка
    await user.click(screen.getByRole("button", { name: "Очистить выполненные" }));
    expect(onClearCompleted).toHaveBeenCalled();
});
