// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
//     );
//   },
// });

// const fileFilter = (req, file, cb) => {
//   // aceitar apenas arquivos de imagem
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5, // permitir apenas imagens de até 5MB
//   },
//   fileFilter: fileFilter,
// });

// module.exports = upload;

const multer = require("multer");

// Configuração do Multer para o armazenamento de arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/"); // Define o diretório de destino para salvar os arquivos
  },
  filename: function (req, file, cb) {
    // Gera um nome de arquivo único baseado na data e nome original do arquivo
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

// Filtra os tipos de arquivos aceitos (apenas JPEG e PNG)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true); // Aceita o arquivo
  } else {
    cb(null, false); // Rejeita o arquivo
  }
};

// Configuração completa do Multer
const upload = multer({
  storage: storage, // Configura o armazenamento dos arquivos
  limits: {
    fileSize: 1024 * 1024 * 5, // Limita o tamanho dos arquivos (5MB neste caso)
  },
  fileFilter: fileFilter, // Aplica o filtro de tipos de arquivo
});

module.exports = upload; // Exporta o middleware de upload configurado
