const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "root",
  database: "likeme",
  allowExitOnIdle: true,
});

const agregarPost = async (titulo, img, descripcion) => {
  const consultaPost = "INSERT INTO posts (titulo, img, descripcion) values ( $1, $2, $3)";
  const values = [titulo, img, descripcion];
  const result = await pool.query(consultaPost, values);
  console.log("Post agregado");
};



  

  

const obtenerPost = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts");
    console.log("Se obtuvieron todos los posts:", rows);
    return rows;
  } catch (error) {
    console.log("Error al obtener los posts", error);
    throw error;
  }
};

module.exports = {
  obtenerPost,
  agregarPost,
};
