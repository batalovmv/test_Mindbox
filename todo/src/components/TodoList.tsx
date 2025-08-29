import { Todo } from "../types";
import TodoItem from "./TodoItem";
import { List, Typography, Paper } from "@mui/material";

interface Props {
    items: Todo[];
    onToggle(id: string): void;
    onRemove(id: string): void;
}

export default function TodoList({ items, onToggle, onRemove }: Props) {
    if (items.length === 0) {
        return (
            <Paper variant="outlined" sx={{ p: 2, textAlign: "center", opacity: 0.8 }}>
                <Typography variant="body2">Нет задач по текущему фильтру</Typography>
            </Paper>
        );
    }
    return (
        <List dense disablePadding>
            {items.map((t) => (
                <TodoItem key={t.id} todo={t} onToggle={onToggle} onRemove={onRemove} />
            ))}
        </List>
    );
}
