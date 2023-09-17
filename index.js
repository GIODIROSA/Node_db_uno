const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { Pool } = require("pg");
const {
  obtenerPost,
  agregarPost,
  modificarTitulo,
  eliminarPost,
} = require("./likeme");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "root",
  database: "likeme",
  allowExitOnIdle: true,
});

const reportarConsulta = async (req, res, next) => {
  const parametros = req.params;
  const url = req.url;
  console.log(
    `Hoy ${new Date()} se ha recibido una consulta en la ruta ${url} con los parametros: `,
    parametros
  );
  next();
};

app.listen("3001", console.log("¡SERVIDOR ENCENDIDO!"));

app.get("/posts", reportarConsulta, async (req, res) => {
  try {
    const posts = await obtenerPost();
    const postResultado = res.json(posts);
    console.log(postResultado);
  } catch (error) {
    console.error("ERROR al obtener los posts", error);
  }
});

app.post("/posts", reportarConsulta, async (req, res) => {
  const { titulo, url, descripcion } = req.body;

  try {
    await agregarPost(titulo, url, descripcion);
    const message = "Post agregado con éxito";
    res.status(201).json({ message });
  } catch (error) {
    console.error("Error al agregar el post:", error);
    res.status(500).json({ error: "Error al agregar un post" });
  }
});

app.put("/posts/:id", reportarConsulta, async (req, res) => {
  const { id } = req.params;
  const { titulo } = req.query;
  try {
    await modificarTitulo(titulo, id);
    res.send("Título modificado con éxito");
  } catch ({ code, message }) {
    res.status(code).send(message);
  }
});

app.delete("/posts/:id", reportarConsulta, async (req, res) => {
  const { id } = req.params;

  try {
    await eliminarPost(id);
    res.send("POST eliminado con éxito");
  } catch (error) {
    console.error("Error al eliminar el post:", error);
    res.status(500).json({ error: "Error al eliminar el post" });
  }
});
