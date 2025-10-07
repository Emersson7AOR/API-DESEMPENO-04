import express from "express";
import clienteRoutes from "./routes/clienteRoutes.js";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/ping", async (req, res) => {
  res.json({ message: "API funcionando correctamente" });
});

app.use("/api/clientes", clienteRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en ${port}`);
});
