const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const createPath = (page) => path.join(__dirname, "views", `${page}.ejs`);

let posts = [];

app.get("/", (req, res) => {
  res.render(createPath("index"));
});

app.get("/add-post", (req, res) => {
  res.render(createPath("add-post"));
});

app.post("/add-post", (req, res) => {
  const { title, author } = req.body;
  posts.push({ title, author });
  res.redirect("/posts");
});

app.get("/posts", (req, res) => {
  res.render(createPath("posts"), { posts });
});

app.listen(PORT, () => {
  console.log(`Server has been started on PORT ${PORT}...`);
})
