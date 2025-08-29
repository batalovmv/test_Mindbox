import { Filter } from "../types";
import { ButtonGroup, Button } from "@mui/material";

interface Props {
    value: Filter;
    onChange(filter: Filter): void;
}

export default function Filters({ value, onChange }: Props) {
    return (
        <ButtonGroup size="small" aria-label="Фильтр задач">
            <Button
                variant={value === Filter.All ? "contained" : "outlined"}
                onClick={() => onChange(Filter.All)}
            >
                Все
            </Button>
            <Button
                variant={value === Filter.Active ? "contained" : "outlined"}
                onClick={() => onChange(Filter.Active)}
            >
                Активные
            </Button>
            <Button
                variant={value === Filter.Completed ? "contained" : "outlined"}
                onClick={() => onChange(Filter.Completed)}
            >
                Выполненные
            </Button>
        </ButtonGroup>
    );
}
