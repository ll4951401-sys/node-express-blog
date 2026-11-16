const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const createPath = (page) => path.join(__dirname, "views", `${page}.ejs`);

// Сховище постів у пам'яті
let posts = [];

// 1. Головна сторінка
app.get("/", (req, res) => {
  res.render(createPath("index"));
});

// 2. Сторінка створення посту
app.get("/add-post", (req, res) => {
  res.render(createPath("add-post"));
});

app.post("/add-post", (req, res) => {
  const { title, description, author } = req.body;
  const id = Date.now().toString();
  posts.push({ id, title, description, author });
  res.redirect("/posts");
});

// 3. Сторінка зі списком усіх постів
app.get("/posts", (req, res) => {
  res.render(createPath("posts"), { posts });
});

// 4. Сторінка редагування посту
app.get("/edit/:id", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) return res.redirect("/posts");
  res.render(createPath("edit-post"), { post });
});

app.post("/edit/:id", (req, res) => {
  const { title, description, author } = req.body;
  const index = posts.findIndex((p) => p.id === req.params.id);
  if (index !== -1) {
    posts[index] = { id: req.params.id, title, description, author };
  }
  res.redirect("/posts");
});

// 5. Видалення посту
app.post("/delete/:id", (req, res) => {
  posts = posts.filter((p) => p.id !== req.params.id);
  res.redirect("/posts");
});

app.listen(PORT, () => {
  console.log(`Server has been started on PORT ${PORT}...`);
});
