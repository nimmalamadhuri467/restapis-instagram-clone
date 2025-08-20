const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
const multer = require('multer');
const port = 8080; // <-- define the port here

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static('uploads'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Multer setup
const upload = multer({ dest: 'uploads/' });

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



// Dummy Data (just like Quora app)
let posts = [
  { id: uuidv4(), username: "mads", content: "Hello, Instagram world!" },
  { id: uuidv4(), username: "ben", content: "Coffee and code ☕💻" }
];

// ROUTES

// Home -> list all posts
app.get("/posts", (req, res) => {
  res.render("index", { posts });
});

// Show new post form
app.get("/posts/new", (req, res) => {
  res.render("new");
});

// Create new post
app.post("/posts", upload.single('image'), (req, res) => {
    const { username, content } = req.body;
    const image = req.file ? req.file.filename : ""; // save filename or empty string
    const newPost = {
        id: uuidv4(),
        username,
        content,
        image,
        likes: 0
    };
    posts.push(newPost);
    fs.writeFileSync('./data/posts.json', JSON.stringify(posts, null, 2));
    res.redirect("/posts");
});


// Show single post detail
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => p.id === id);
  res.render("show", { post });
});

// Edit post form
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => p.id === id);
  res.render("edit", { post });
});
// PATCH route to like a post
app.patch("/posts/:id/like", (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);
    if(post) {
        post.likes += 1;
        fs.writeFileSync("./data/posts.json", JSON.stringify(posts, null, 2));
    }
    res.redirect("/posts");
});


// Update post
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => p.id === id);
  post.content = newContent;
  res.redirect("/posts");
});
app.post("/posts/:id/comments", (req, res) => {
    const { id } = req.params;
    const { username, text } = req.body;
    const post = posts.find(p => p.id === id);
    if(post) {
        if(!post.comments) post.comments = [];
        post.comments.push({ username, text });
        fs.writeFileSync("./data/posts.json", JSON.stringify(posts, null, 2));
    }
    res.redirect("/posts");
});


// Delete post
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => p.id !== id);
  res.redirect("/posts");
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

