import express from "express";
import clienteRoutes from "./routes/clienteRoutes.js";
import departamentosRoutes from "./routes/departamentosRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba
app.get("/ping", (req, res) => {
  res.json({ message: "API funcionando correctamente" });
});

// Rutas principales
app.use("/api/clientes", clienteRoutes);
app.use("/api/departamentos", departamentosRoutes);

// Manejador de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
  });
});

// Manejador global de errores
app.use((err, req, res, next) => {
  console.error("Error en el servidor:", err);
  res.status(500).json({
    success: false,
    message: "Error interno del servidor",
    error: err.message,
  });
});

app.listen(port, () => {
  console.log(`✅ Servidor escuchando en el puerto ${port}`);
});

export default app;
