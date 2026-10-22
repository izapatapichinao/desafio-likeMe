const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1258",
  database: "likeme",
  allowExitOnIdle: true,
});

const getPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
};

const agregarPost = async (titulo, img, descripcion) => {
  const consulta =
    "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)";
  const values = [titulo, img, descripcion, 0];
  const result = await pool.query(consulta, values);
  return result;
};

const darLike = async (id) => {
  const consulta =
    "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *";
  const values = [id];
  const result = await pool.query(consulta, values);
};

const eliminarPost = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1";
  const values = [id];
  const result = await pool.query(consulta, values);
};

module.exports = { getPosts, agregarPost, darLike, eliminarPost };
