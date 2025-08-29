import { reducer, initialState, selectRemaining, selectFiltered } from "./todos";
import { Filter, Todo } from "../types";

describe("todos domain", () => {
    beforeEach(() => {
        jest.spyOn(Date, "now").mockReturnValue(1700000000000);
        // мок crypto.randomUUID (если есть)
        if ((global as any).crypto?.randomUUID) {
            jest.spyOn(global.crypto, "randomUUID").mockReturnValue("uuid-1" as any);
        } else {
            // если randomUUID нет — можно замокать newId отдельно, либо оставить так
        }
    });

    it("adds trimmed todo and ignores empty", () => {
        let state = initialState([]);
        state = reducer(state, { type: "add", title: "  Task  " });
        expect(state.todos[0]).toMatchObject({
            title: "Task",
            completed: false,
            createdAt: 1700000000000,
        });

        const s2 = reducer(state, { type: "add", title: "   " });
        expect(s2.todos.length).toBe(state.todos.length); // пустая строка игнорится
    });

    it("toggles, removes, clears completed", () => {
        const seed: Todo[] = [
            { id: "a", title: "A", completed: false, createdAt: 1 },
            { id: "b", title: "B", completed: true, createdAt: 2 },
        ];
        let state = initialState(seed);

        state = reducer(state, { type: "toggle", id: "a" });
        expect(state.todos.find(t => t.id === "a")!.completed).toBe(true);

        state = reducer(state, { type: "remove", id: "a" });
        expect(state.todos.map(t => t.id)).toEqual(["b"]);

        state = reducer(state, { type: "clearCompleted" });
        expect(state.todos).toEqual([]);
    });

    it("filters and counts remaining", () => {
        const seed: Todo[] = [
            { id: "1", title: "X", completed: false, createdAt: 1 },
            { id: "2", title: "Y", completed: true, createdAt: 2 },
        ];
        expect(selectRemaining(seed)).toBe(1);
        expect(selectFiltered(seed, Filter.All)).toHaveLength(2);
        expect(selectFiltered(seed, Filter.Active)).toHaveLength(1);
        expect(selectFiltered(seed, Filter.Completed)).toHaveLength(1);
    });
});
