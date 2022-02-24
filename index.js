const express = require("express");
const app = express();
const cors = require("cors");

const todos = [
  {
    id: 1,
    content: "Learn Node.js",
    done: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 2,
    content: "Learn React.js",
    done: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 3,
    content: "Learn Angular.js",
    done: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 4,
    content: "Learn Vue.js",
    done: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/todos", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "todos retrieved successfully",
    payload: todos,
  });
});

app.get("/todos/:id", (req, res) => {
  const todo = todos.find((todo) => todo.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({
      status: 404,
      message: "todo not found",
      payload: null,
    });
  }
  res.status(200).json({
    status: 200,
    message: "todo retrieved successfully",
    payload: todo,
  });
});

app.post("/todos", (req, res) => {
  // validate body
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({
      status: 400,
      message: "content is required",
      payload: null,
    });
  }

  // create new todo
  const todo = {
    id: todos.length + 1,
    content: req.body.content,
    done: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  todos.push(todo);

  res.status(201).json({
    status: 201,
    message: "todo created successfully",
    payload: todo,
  });
});

app.put("/todos/:id", (req, res) => {
  // validate body
  if (
    !req.body.content ||
    req.body.content.trim() === "" ||
    typeof req.body.done !== "boolean"
  ) {
    return res.status(400).json({
      status: 400,
      message: "invalid request body",
      payload: null,
    });
  }

  const todo = todos.find((todo) => todo.id === parseInt(req.params.id));

  if (!todo) {
    return res.status(404).json({
      status: 404,
      message: "todo not found",
      payload: null,
    });
  }

  todo.content = String(req.body.content) ?? todo.content;
  todo.done = Boolean(req.body.done) ?? todo.done;
  todo.updatedAt = new Date();

  res.status(200).json({
    status: 200,
    message: "todo updated successfully",
    payload: todo,
  });
});

app.delete("/todos/:id", (req, res) => {
  const todo = todos.find((todo) => todo.id === parseInt(req.params.id));

  if (!todo) {
    return res.status(404).json({
      status: 404,
      message: "todo not found",
      payload: null,
    });
  }

  todo.deletedAt = new Date();

  res.status(200).json({
    status: 200,
    message: "todo deleted successfully",
    payload: todo,
  });
});

app.listen(4444, () => {
  console.log("Server started on port 4444");
});
