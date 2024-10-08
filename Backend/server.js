import express from "express";

const app = express();

app.use(express.json());

const port = 3000;

const data = [];
const blog = [];
const login = [];

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.get("/name", (req, res) => {
  res.send("Hi!! My name is Yousef..");
});

app.get("/age", (req, res) => {
  res.send("I have 24 years old");
});

app.get("/info", (req, res) => {
  res.json(data);
});

app.post("/info", (req, res) => {
  const user = req.body.user;
  const email = req.body.email;
  const pass = req.body.pass;

  const userInfo = { id: data.length + 1, user, email, pass };

  data.push(userInfo);
  res.json(userInfo);
});

app.patch("/info/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { user, email, pass } = req.body;

  const userInfo = data.find((i) => i.id === id);

  if (userInfo) {
    userInfo.user = user || userInfo.user;
    userInfo.email = email || userInfo.email;
    userInfo.pass = pass || userInfo.pass;
    res.json(userInfo);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.delete("/info/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const userInfo = data.findIndex((i) => i.id === id);

  data.splice(userInfo, 1);

  res.json({ message: "User Deleted" });
});

app.get("/blog", (req, res) => {
  res.json(blog);
});

app.post("/blog", (req, res) => {
  const auther = req.body.auther;
  const content = req.body.content;

  const blogeInfo = { id: blog.length + 1, auther, content };

  blog.push(blogeInfo);
  res.json(blogeInfo);
});

app.get("/login", (req, res) => {
  res.json(login);
});

app.post("/login", (req, res) => {
  const user = req.body.user;
  const pass = req.body.pass;

  const logInfo = { user, pass };

  const userInfo = data.find((i) => i.user === user);
  if (userInfo.pass === pass) {
    // login.push(logInfo);
    res.json({ message: "Login successfully" });
  }

  res.json({ message: "Login filed" });
});

app.listen(port, () => {
  console.log("http://localhost:" + port);
});
