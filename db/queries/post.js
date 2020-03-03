const postQueries = {
    createPost: `INSERT INTO posts(user_id, heading, post) VALUES ($1, $2, $3) RETURNING id;`,
    allPosts: 'SELECT * FROM posts;',
    onePost: 'SELECT * FROM posts WHERE id = $1;',
    allOwnPosts: 'SELECT * FROM posts WHERE user_id = $1;',
    updatePost: `UPDATE posts SET heading=$1, post=$2 WHERE id=$3;`,
    deletePost: `DELETE FROM posts WHERE id=$1;`,
    confirmPost: `SELECT post FROM posts WHERE post = $1;`
}

export default postQueries;