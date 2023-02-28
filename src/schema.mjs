export const typeDefs = `#graphql
  type Todo {
    account: String!
    id: Int!
    label: String
    complete: Boolean
  }
  type Query {
    todos: [Todo],
    todo(id: Int!): Todo
  }
  type Mutation {
    createTodo(id: Int, label: String): Todo
    updateTodo(id: Int!, label: String, complete: Boolean): Todo
    deleteTodo(id: Int!): Todo
  }
`;
