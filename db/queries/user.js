const userQueries = {
    createUser: `INSERT INTO users(first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id;`,
    getUserByEmail: `SELECT * FROM users WHERE email = $1;`,
    allUsers: 'SELECT * FROM users;',
    oneUser: 'SELECT * FROM users WHERE id = $1;',
    confirmEmail: `SELECT email FROM users WHERE email = $1;`
}

export default userQueries;
