import { Router } from "https://deno.land/x/oak/mod.ts";

import todoController from "../controllers/todo.ts";


const router = new Router();

router
  .get("/todos", todoController.getAllTodos)
  .post("/todos", todoController.createTodo)
  .get("/todos/:id", todoController.getTodoById)
  .put("/todos/:id", todoController.updateTodoById)
  .delete("/todos/:id", todoController.deleteTodoById);

export default router;
