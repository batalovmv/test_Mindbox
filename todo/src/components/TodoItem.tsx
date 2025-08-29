import { Todo } from "../types";
import {
    ListItem,
    Checkbox,
    IconButton,
    ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
    todo: Todo;
    onToggle(id: string): void;
    onRemove(id: string): void;
}

export default function TodoItem({ todo, onToggle, onRemove }: Props) {
    return (
        <ListItem
            disableGutters
            secondaryAction={
                <IconButton
                    edge="end"
                    aria-label="Удалить задачу"
                    onClick={() => onRemove(todo.id)}
                >
                    <DeleteIcon />
                </IconButton>
            }
        >
            <Checkbox
                edge="start"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                tabIndex={-1}
                inputProps={{ "aria-label": "Отметить выполненным" }}
            />
            <ListItemText
                primary={todo.title}
                sx={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    opacity: todo.completed ? 0.65 : 1,
                }}
            />
        </ListItem>
    );
}
