 const ToDos = require("./Todoslib");

function getAllTodos(req, res) {
  res.json(ToDos.getAll());
}

function getTodoById(req, res) {
  const todo = ToDos.findById(req.params.todoId);
  if (!todo) return res.status(404).json({ error: "Not found" });
  res.json(todo);
}

function createTodo(req, res) {
  const { task, completed, dueDate } = req.body;
  const newTodo = ToDos.addOne(task, completed, dueDate);
  if (!newTodo) return res.status(400).json({ error: "Invalid input" });
  res.status(201).json(newTodo);
}

function updateTodo(req, res) {
  const updated = ToDos.updateOneById(req.params.todoId, req.body);
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
}

function deleteTodo(req, res) {
  const deleted = ToDos.deleteOneById(req.params.todoId);
  if (!deleted) return res.status(404).json({ error: "Not found" });
  res.json({ message: "Deleted successfully" });
}

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
