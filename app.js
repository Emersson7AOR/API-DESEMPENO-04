import express from "express";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/ping", async (req, res) => {
  res.json({ message: "API funcionando correctamente" });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en ${port}`);
});
