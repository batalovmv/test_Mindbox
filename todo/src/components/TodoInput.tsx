import { useId, useState } from "react";
import { Stack, TextField, Button } from "@mui/material";

interface Props {
    onAdd(title: string): void;
}

export default function TodoInput({ onAdd }: Props) {
    const [value, setValue] = useState("");
    const inputId = useId();

    const submit = () => {
        const title = value.trim();
        if (!title) return;
        onAdd(title);
        setValue("");
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                submit();
            }}
        >
            <Stack direction="row" spacing={1}>
                <TextField
                    id={inputId}
                    fullWidth
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Что нужно сделать?"
                    label="Новая задача"
                    size="small"
                />
                <Button type="submit" variant="contained">
                    Добавить
                </Button>
            </Stack>
        </form>
    );
}
