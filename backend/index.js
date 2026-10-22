const express = require("express");
const cors = require("cors");
const { getPosts, agregarPost, darLike, eliminarPost } = require("./consultas");

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

// Ruta para devolver los registros
app.get("/posts", async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Ruta Post para agregar nuevo registro
app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;

    await agregarPost(titulo, url, descripcion);

    res.send("Post agregado con éxito");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put("/posts/like/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await darLike(id);
    res.send("Like actualizado con éxito");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarPost(id);
    res.send("Post eliminado con éxito");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`¡Servidor encendido!`);
});
