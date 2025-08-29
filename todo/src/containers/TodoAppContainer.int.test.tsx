import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoAppContainer from "./TodoAppContainer";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

// Обёртка c MUI, чтобы совпадал рендер с приложением
function renderWithProviders(ui: React.ReactElement) {
    const theme = createTheme();
    return render(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {ui}
        </ThemeProvider>
    );
}

beforeEach(() => {
    localStorage.clear();
});

test("TodoAppContainer end-to-end flow (add → toggle → filter → clear)", async () => {
    const user = userEvent.setup();
    renderWithProviders(<TodoAppContainer />);

    // Добавление двух задач
    const input = screen.getByLabelText(/Новая задача/i);
    await user.type(input, "Alpha");
    await user.keyboard("{Enter}");
    await user.type(input, "Beta");
    await user.keyboard("{Enter}");

    // Обе видны
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
    expect(screen.getByText(/Осталось:\s*2/)).toBeInTheDocument();

    // Отметим "Alpha" как выполненную
    const alphaItem = screen.getByText("Alpha").closest("li")!;
    const alphaCheckbox = within(alphaItem).getByRole("checkbox");
    await user.click(alphaCheckbox);

    // Счётчик уменьшился
    expect(screen.getByText(/Осталось:\s*1/)).toBeInTheDocument();

    // Фильтр: «Выполненные»
    await user.click(screen.getByRole("button", { name: "Выполненные" }));
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.queryByText("Beta")).not.toBeInTheDocument();

    // Фильтр: «Активные»
    await user.click(screen.getByRole("button", { name: "Активные" }));
    expect(screen.getByText("Beta")).toBeInTheDocument();
    expect(screen.queryByText("Alpha")).not.toBeInTheDocument();

    // Вернём «Все», очистим выполненные
    await user.click(screen.getByRole("button", { name: "Все" }));
    await user.click(screen.getByRole("button", { name: "Очистить выполненные" }));

    // Alpha исчезла, осталась Beta
    expect(screen.queryByText("Alpha")).not.toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
    expect(screen.getByText(/Осталось:\s*1/)).toBeInTheDocument();
});
