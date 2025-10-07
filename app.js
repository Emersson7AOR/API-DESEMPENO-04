import express from "express";
import clienteRoutes from "./routes/clienteRoutes.js";
<<<<<<< HEAD
import sucursalRoutes from "./routes/sucursalRoutes.js";
=======
import productRoutes from "./routes/productRoutes.js";
import empleadoRoutes from './routes/empleadoRoutes.js';
>>>>>>> origin/QA

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/ping", async (req, res) => {
  res.json({ message: "API funcionando correctamente" });
});

// Rutas
app.use("/api/clientes", clienteRoutes);
<<<<<<< HEAD

app.use("/api/sucursales", sucursalRoutes);
=======
app.use("/api/products", productRoutes);
app.use('/api/empleados', empleadoRoutes);
>>>>>>> origin/QA

app.listen(port, () => {
  console.log(`Servidor escuchando en ${port}`);
});
EOF
