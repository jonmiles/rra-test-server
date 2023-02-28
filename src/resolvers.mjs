import {db} from './db.mjs';

import {
  todoResolver,
  todosResolver,
  createTodoResolver,
  updateTodoResolver,
  deleteTodoResolver,
} from './todos/resolvers.mjs';

export const resolvers = {
  Query: {
    todos: todosResolver({db}),
    todo: todoResolver({db}),
  },
  Mutation: {
    createTodo: createTodoResolver({db}),
    updateTodo: updateTodoResolver({db}),
    deleteTodo: deleteTodoResolver({db}),
  },
};
