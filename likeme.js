const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "root",
  database: "likeme",
  allowExitOnIdle: true,
});

const agregarPost = async (titulo, img, descripcion) => {
  try {
    const consultaPost =
      "INSERT INTO posts (titulo, img, descripcion) VALUES ($1, $2, $3)";
    const values = [titulo, img, descripcion];
    await pool.query(consultaPost, values);
    console.log("Post agregado con éxito");
  } catch (error) {
    console.error("Error al agregar el post:", error);
    throw new Error("Error al agregar el post");
  }
};

const obtenerPost = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts");
    return rows;
  } catch (error) {
    console.error("Error al obtener los posts:", error);
    throw new Error("Error al obtener los posts");
  }
};

const modificarTitulo = async (titulo, id) => {
  try {
    const consulta = "UPDATE posts SET titulo = $1 WHERE id = $2";
    const values = [titulo, id];
    const { rowCount } = await pool.query(consulta, values);

    if (rowCount === 0) {
      throw new Error("No se encontró ningún post con este ID");
    }

    return "Título modificado con éxito";
  } catch (error) {
    if (error.code === 404) {
      throw error;
    } else {
      console.error("Error al modificar el título:", error);
      throw new Error("Error al modificar el título del post");
    }
  }
};

const eliminarPost = async (id) => {
  const consulta = "DELETE FROM posts WHERE id =$1";
  const values = [id];
  try {
    const result = await pool.query(consulta, values);
    console.log(`Post ID = ${id} eliminado con éxito`);
  } catch (error) {
    `Error al eliminar el registro con ID ${id}: ${error.message}`;
  }
};

module.exports = {
  obtenerPost,
  agregarPost,
  modificarTitulo,
  eliminarPost,
};
