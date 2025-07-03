# 📝 Tasks Flow

**Tasks Flow** — сучасний таск-менеджер у стилі Trello з drag-and-drop, пошуком, темною/світлою темою, адаптивною версткою та зручним UI.

[Live Demo на Vercel](https://your-app.vercel.app) • [GitHub Repo](https://github.com/yourusername/yourproject)

---

## 🚀 Features

- **CRUD для дошок, колонок і карток**
- **Drag-and-drop** між колонками (react-beautiful-dnd)
- **Пошук та швидкий вибір дошки**
- **Темна/світла тема** (збереження вибору)
- **Адаптивний дизайн** (мобільні/десктоп)
- **Сучасний UI** (TailwindCSS + кастомні компоненти)
- **Сповіщення про дії** (notistack)
- **Оптимістичні оновлення** при drag-and-drop

---

## 🛠️ Tech Stack

- **React** + **TypeScript**
- **Redux Toolkit** (state, async)
- **Tailwind CSS** (адаптивний дизайн)
- **Vite** (швидка збірка)
- **react-beautiful-dnd** (drag-and-drop)
- **Material-UI** (деякі UI-компоненти)
- **Axios** (API)
- **Vercel** (деплой)

---

## 📸 Screenshots

> _Додай сюди 1-2 скріншоти інтерфейсу (drag-and-drop, темна тема, пошук тощо)_

---

## ⚡ Live Demo

- [Перейти до застосунку](https://your-app.vercel.app)
- [Код на GitHub](https://github.com/yourusername/yourproject)

---

## 🧑‍💻 Як запустити локально

   ```bash
   git clone https://github.com/yourusername/yourproject.git
   cd yourproject
npm install
npm run dev
```
- Відкрий [http://localhost:5173](http://localhost:5173)

---

## ⚙️ Production Build

```bash
npm run build
npm run preview
```

---

## 📦 Структура Redux Store

```js
{
  boards: {
    currentBoard: { _id, title, columns: [ ... ] },
    boards: [ ... ]
  },
  cards: {
    isLoading: boolean,
    error: string | null
  }
}
```

---

## 📝 Usage

- **Створюй, редагуй, видаляй дошки, колонки, картки**
- **Перетягуй картки між колонками**
- **Шукай дошки через пошук**
- **Перемикай тему (світла/темна)**

---

## 💡 Майбутні покращення

- Покращене UX для помилок
- Undo для drag-and-drop
- Більше тестів
- Інтеграція з бекендом (якщо потрібно)

---

## 🤝 Contributing

1. Fork this repo
2. Створи гілку: `git checkout -b feature/my-feature`
3. Зроби коміт: `git commit -m 'Add feature'`
4. Відправ: `git push origin feature/my-feature`
5. Створи Pull Request

---

## 📄 License

MIT

---

> _Зроблено з ❤️ для портфоліо_

