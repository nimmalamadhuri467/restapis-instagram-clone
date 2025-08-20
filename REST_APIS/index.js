
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.set("view engine", "ejs"); // ✅ fixed spacing
app.set("views", path.join(__dirname, "views"));



app.use(express.static(path.join(__dirname, "public")));

let posts = [
    { id:uuidv4(),username: "apna college", content: "most loved coding community" },
    { id:uuidv4(),username: "madhuri", content: "aspiring and curious human" },
    { id:uuidv4(),username: "shiro", content: "iam a good boy" }
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});
app.get("/posts/new", (req, res) => {
    res.render("new.ejs" );
});


app.post("/posts", (req, res) => {
    let  { username, content } = req.body;
    let id=uuidv4()
    posts.push({ id,username, content });
    res.redirect("/posts");
});
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => p.id == id);
    console.log(post)
    res.render("show.ejs",{post});
});


app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    console.log(newContent);
    let post = posts.find(p => p.id == id);
    post.content=newContent
    console.log(post)
     res.redirect(`/posts/`);

});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  console.log("Requested ID:", id);
  console.log("Available post IDs:", posts.map(p => p.id));

  let post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter(p => p.id !== id); // reassign back
  res.redirect("/posts");
});



app.listen(port, () => {
    console.log(`port listening at ${port}`);
});
