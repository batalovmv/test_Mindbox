```markdown
## 🛠️ Стек технологий
- **React 18**, **TypeScript**
- **Hooks:** `useReducer`, `useEffect`, `useMemo`, `useState`
- **Material UI (MUI)** для компонентов интерфейса
- **Jest + React Testing Library** для тестов (CRA-встроенный Jest + jsdom)
- **gh-pages** для деплоя

---

## 📂 Структура проекта

```text
src/
├── components/        # Глупые (presentational) компоненты
│   ├── TodoApp.tsx
│   ├── TodoInput.tsx
│   ├── TodoItem.tsx
│   ├── TodoList.tsx
│   └── Filters.tsx
├── containers/        # Умный контейнер
│   └── TodoAppContainer.tsx
├── hooks/             # Кастомные хуки
│   └── useTodos.ts
├── domain/            # Бизнес-логика (редьюсер и селекторы)
│   └── todos.ts
├── utils/             # Вспомогательные функции
│   ├── id.ts
│   └── storage.ts
├── types.ts           # Типы данных
├── constants.ts       # Константы
├── index.tsx          # Точка входа с MUI Theme
└── setupTests.ts      # Настройка тестов

````

---

## ⚡ Установка и запуск

```bash
# 1) Клонировать репозиторий
git clone https://github.com/USERNAME/REPO.git
cd REPO

# 2) Установить зависимости
npm install

# 3) Запустить локально (CRA)
npm start
````

Приложение откроется на: [http://localhost:3000](http://localhost:3000)

---

## ✅ Тестирование

```bash
# запустить тесты в интерактивном режиме
npm test

# один прогон (CI mode)
CI=true npm test
```

Покрытие тестами включает:

* **Юнит:** бизнес-логика (`src/domain/todos.ts`) — `add`, `toggle`, `remove`, `clearCompleted`, `setFilter`, селекторы.
* **UI smoke:** компоненты (`TodoItem`, `TodoApp`) — вызов проп-колбэков и базовый рендер.
* **Интеграционный:** `TodoAppContainer` — сквозной сценарий (добавление → переключение фильтров → отметка выполненной → очистка).

> CRA автоматически подхватывает `src/setupTests.ts`:
>
> ```ts
> // src/setupTests.ts
> import "@testing-library/jest-dom";
> ```

---

## 🎨 Оформление (MUI)

Основные правки для MUI уже внесены:

* Контейнеры: `Container`, `Paper`, `Stack`, `Typography`, `Button`, `Divider`, `List`, `ListItem`, `Checkbox`, `IconButton`.
* В `index.tsx` добавлены `ThemeProvider` и `CssBaseline`.
* Для предотвращения некрасивых переносов:

  * Используются неразрывные пробелы: `{"Осталось:\u00A0"}{remaining}`, `{"Очистить\u00A0выполненные"}`
  * Проставлен `sx={{ whiteSpace: "nowrap" }}` для нужных элементов.

---

## 🌐 Деплой на GitHub Pages (CRA)

1. Установить пакет деплоя:

```bash
npm i -D gh-pages
```

2. В `package.json` добавить поле `homepage`:

```json
"homepage": "https://USERNAME.github.io/REPO"
```

3. Добавить скрипты:

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build",
  "test": "react-scripts test --env=jsdom"
}
```

4. Закоммитить и запушить код (ветка `main`/`master`).

5. Запустить деплой:

```bash
npm run deploy
```

6. В GitHub: **Settings → Pages → Source → Deploy from a branch → Branch = gh-pages (/root)**.

Сайт будет доступен по адресу из `homepage`.

---

## 🧪 Полезные подсказки

* **Пустая страница/битые пути** — проверь `homepage` (учитывай регистр в `REPO`).
* **404 при обновлении** — наш ToDo без клиентского роутера, всё ок. Если добавишь `react-router`, понадобится SPA-fallback (`404.html`).
* **Кэш** — если изменения не видны, сделай hard refresh.
* **LocalStorage в тестах** — jsdom предоставляет по умолчанию; при необходимости чистить:

  ```ts
  beforeEach(() => localStorage.clear());
  ```

---

## 📸 Скриншот

Добавьте скриншот интерфейса в корень репозитория:

```
./screenshot.png
```

И он будет отображаться здесь:

```md
![Скриншот приложения](./screenshot.png)
```

---

## 👨‍💻 Автор

Выполнено в рамках тестового задания **Frontend Intern**.
Стек: React, TypeScript, MUI, Jest/RTL, gh-pages.

```
```
