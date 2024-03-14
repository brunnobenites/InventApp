const express = require("express");
const authMiddleware = require("./middlewares/authMiddleware");
const authController = require("./controllers/authController");
const settingsController = require("./controllers/settingsController");
const errorMiddleware = require("./middlewares/errorMiddleware");
require("express-async-errors");
const cors = require("cors");
const helmet = require("helmet");

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

app.post("/logout", authController.doLogout);

app.use("/", (req, res, next) => {
  res.send("Hello World!");
}); //middleware com / generico coloca por ultimo

app.use(errorMiddleware); //middleware de erro sempre no final

module.exports = app;
