import React from "react";
import { createRoot } from "react-dom/client";
import TodoAppContainer from "./containers/TodoAppContainer";

const container = document.getElementById("root");
if (!container) throw new Error("Root container not found");

createRoot(container).render(
    <React.StrictMode>
        <TodoAppContainer />
    </React.StrictMode>
);
