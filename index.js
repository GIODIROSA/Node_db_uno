const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { Pool } = require("pg");
const { obtenerPost, agregarPost } = require("./likeme");

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

app.listen("3001", console.log("¡SERVIDOR ENCENDIDO!"));

app.get("/posts", async (req, res) => {
  try {
    const posts = await obtenerPost();
    const resultadoPosts = res.json(posts);
    console.log(resultadoPosts);
  } catch (error) {
    console.error("ERROR al obtener los posts", error);
    res.status(500).json({ error: "Error al obtener los viajes" });
  }
});

app.post("/posts", async (req, res) => {
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

