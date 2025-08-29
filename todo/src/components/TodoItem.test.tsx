import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoItem from "./TodoItem";
import { Todo } from "../types";

const sample: Todo = { id: "1", title: "Test", completed: false, createdAt: 1 };

test("renders todo and triggers toggle/remove", async () => {
    const user = userEvent.setup();
    const onToggle = jest.fn();
    const onRemove = jest.fn();

    render(<TodoItem todo={sample} onToggle={onToggle} onRemove={onRemove} />);

    // чекбокс
    await user.click(screen.getByRole("checkbox"));
    expect(onToggle).toHaveBeenCalledWith("1");

    // кнопка удаления (по aria-label из MUI IconButton)
    const removeBtn =
        screen.queryByRole("button", { name: /удалить задачу/i }) ??
        screen.getByRole("button", { name: /удалить/i }); // запасной вариант

    await user.click(removeBtn);
    expect(onRemove).toHaveBeenCalledWith("1");
});
