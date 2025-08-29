import { Filter, Todo } from "../types";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import Filters from "./Filters";
import {
    Container,
    Paper,
    Stack,
    Typography,
    Button,
    Divider,
} from "@mui/material";

interface Props {
    todos: Todo[];
    filteredTodos: Todo[];
    remaining: number;
    filter: Filter;
    onAdd(title: string): void;
    onToggle(id: string): void;
    onRemove(id: string): void;
    onClearCompleted(): void;
    onSetFilter(filter: Filter): void;
}

export default function TodoApp({
    filteredTodos,
    remaining,
    filter,
    onAdd,
    onToggle,
    onRemove,
    onClearCompleted,
    onSetFilter,
}: Props) {
    return (
        <Container maxWidth="sm" sx={{ py: 5 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Stack spacing={2}>
                    <Typography variant="h4" component="h1">
                        ToDo
                    </Typography>

                    <TodoInput onAdd={onAdd} />
                    <Divider />

                    <TodoList items={filteredTodos} onToggle={onToggle} onRemove={onRemove} />

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Typography>Осталось: {remaining}</Typography>
                        <Filters value={filter} onChange={onSetFilter} />
                        <Button variant="outlined" color="secondary" onClick={onClearCompleted}>
                            Очистить
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Container>
    );
}
