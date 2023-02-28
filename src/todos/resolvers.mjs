export function todosResolver({db}) {
  return async function todos(args, req, ctx) {
    try {
      return await new Promise((resolve, reject) => {
        db.all(
          `
            SELECT account, id, label, complete
            FROM todos
            WHERE account = ?
            ORDER BY id DESC
          `,
          [ctx.email],
          function (err, rows) {
            if (err) {
              console.error('err = ', err);
              resolve([]);
            }
            return resolve(rows);
          },
        );
      });
    } catch (e) {
      console.error('e = ', e);
      return [];
    }
  };
}

export function todoResolver({db}) {
  return async function todo(args, req, ctx) {
    try {
      return await new Promise((resolve, reject) => {
        db.get(
          `
            SELECT account, id, label, complete
            FROM todos
            WHERE account = ?
            AND id = ?
          `,
          [ctx.email, req.id],
          function (err, row) {
            if (err) {
              console.error('err = ', err);
              reject(err);
            }
            return resolve(row);
          },
        );
      });
    } catch (e) {
      console.error('e = ', e);
    }
  };
}

export function createTodoResolver({db}) {
  return async function createTodo(args, req, ctx) {
    console.log('create todo = ', req, ctx);
    try {
      return await new Promise((resolve, reject) => {
        db.get(
          `
            INSERT INTO todos (account, label)
            VALUES(?, ?)
            RETURNING *
          `,
          [ctx.email, req.label],
          function (err, row) {
            if (err) {
              console.error('err = ', err);
              reject(err);
            }
            return resolve(row);
          },
        );
      });
    } catch (e) {
      console.error('e = ', e);
    }
  };
}

export function updateTodoResolver({db}) {
  return async function updateTodo(args, req, ctx) {
    console.log('update ');
    try {
      return await new Promise((resolve, reject) => {
        db.get(
          `
            UPDATE todos
            SET label = ?,
            complete = ?
            WHERE account = ?
            AND id = ?
            RETURNING *
          `,
          [req.label, req.complete, ctx.email, req.id],
          function (err, row) {
            if (err) {
              console.error('err = ', err);
              reject(err);
            }
            return resolve(row);
          },
        );
      });
    } catch (e) {
      console.error('e = ', e);
    }
  };
}

export function deleteTodoResolver({db}) {
  return async function deleteTodo(args, req, ctx) {
    try {
      return await new Promise((resolve, reject) => {
        console.log('del sql = ', [req.id]);
        db.run(
          `
          DELETE FROM todos 
          WHERE account = ?
          AND id = ?
        `,
          [ctx.email, req.id],
          function (err) {
            if (err) {
              console.error('err = ', err);
              reject(err);
            }
            return resolve({id: req.id});
          },
        );
      });
    } catch (e) {
      console.error('e = ', e);
    }
  };
}
