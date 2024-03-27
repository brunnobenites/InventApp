const express = require("express");
const authMiddleware = require("./middlewares/authMiddleware");
const authController = require("./controllers/authController");
const settingsController = require("./controllers/settingsController");
const errorMiddleware = require("./middlewares/errorMiddleware");
require("express-async-errors");
const cors = require("cors");
const helmet = require("helmet");
const inventariosController = require("./controllers/inventariosController");
const arvoresController = require("./controllers/arvoresController");
const multer = require("multer");
const upload = require("./upload");

const app = express();

//configs do backend
//para usar middlewares usa app.use
//middlewares sempre usa req, res, next
//middlewares seguem na sequencia
//cors configura a origem do frontend
//helmet protege contra 11 ataques básicos
//express-async-errors pega erro não assincronos (banco de dados e apis)

app.use(cors());

app.use(helmet());
app.use(express.json()); //trans forma em json

//req é o que vem do frontend e res é a resposta

app.post("/login", authController.doLogin);
//post para enviar dados
//200 status ok e 401 não autorizado

app.get("/settings", authMiddleware, settingsController.getSettings);

app.patch("/settings", authMiddleware, settingsController.updateSettings);

app.get("/inventarios/", inventariosController.getAllInventarios);

app.get("/inventarios/:id_inventario", inventariosController.getInventarios);

app.post("/inventarios", inventariosController.insertInventario);

app.patch(
  "/inventarios/:id_inventario",
  inventariosController.updateInventario
);

app.delete(
  "/inventarios/:id_inventario",
  inventariosController.deleteInventario
);

app.get("/arvores/", arvoresController.getAllArvores);

app.get("/arvores/:id_arvore", arvoresController.getArvore);

app.post(
  "/arvores",
  upload.any(),
  (req, res, next) => {
    console.log(req.body); // Log the request body
    console.log(req.files); // Log the files

    // Adicione esta parte para construir o URL da imagem
    if (req.files) {
      const foto1File = req.files.find((file) => file.fieldname === "foto1");
      const foto2File = req.files.find((file) => file.fieldname === "foto2");

      if (foto1File) {
        req.body.foto1 = "http://localhost:3001/uploads/" + foto1File.filename;
      }

      if (foto2File) {
        req.body.foto2 = "http://localhost:3001/uploads/" + foto2File.filename;
      }
    }

    // Convert 'id_inventario' to a number
    req.body.id_inventario = Number(req.body.id_inventario);

    next();
  },
  arvoresController.insertArvore
);

app.patch("/arvores/:id_arvore", arvoresController.updateArvore);

app.delete("/arvores/:id_arvore", arvoresController.deleteArvore);

app.post("/logout", authController.doLogout);

app.use(errorMiddleware); //middleware de erro sempre no final

module.exports = app;
