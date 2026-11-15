const express = require('express');

const app = express();

// Масив для збереження постів в пам'яті (без MongoDB)
let posts = [];

// Налаштування шаблонізатора EJS
app.set('view engine', 'ejs');

// Middleware для обробки даних з форм та JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. Отримання всіх постів
app.get('/posts', (req, res) => {
  res.render('index', { posts: posts });
});

// 2. Створення нового поста
app.post('/posts', (req, res) => {
  const newPost = {
    title: req.body.title,
    author: req.body.author
  };
  posts.push(newPost);
  res.redirect('/posts');
});

// Головний роут
app.get('/', (req, res) => {
  res.redirect('/posts');
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});