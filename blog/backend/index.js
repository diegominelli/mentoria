const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

let db = [
  {
    id: 1,
    title: "My Post",
    description: "My post",
    body: "agasgasgag",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/posts/:id", (req, res) => {
  const id = req.param("id");
  const foundPost = db.find((item) => item.id === +id);

  res.send(foundPost);
});

app.get("/posts/:id", (req, res) => {
  res.send(db);
});

app.post("/posts", (req, res) => {
  const { body } = req;
  const newPost = { id: db.length + 1, ...body };

  db.push(newPost);
  res.send(newPost);
});

app.put("/posts/:id", (req, res) => {
  const id = req.param("id");
  const { body } = req;

  const newDb = db.map((item) => {
    if (item.id === +id) {
      return { ...item, ...body };
    }
    return item;
  });

  db = newDb;
  res.send("OK!");
});

app.delete("/posts/:id", (req, res) => {
  const id = req.param("id");

  const newDb = db.filter((item) => {
    return item.id !== +id;
  });

  db = newDb;
  res.send("OK!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
