const ExcelJS = require("exceljs");

async function exportarTabelaArvores() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Arvores");

  // Definir cabeçalhos da planilha
  worksheet.columns = [
    { header: "ID Árvore", key: "id_arvore", width: 10 },
    { header: "ID Inventário", key: "id_inventario", width: 10 },
    { header: "Nº Tag", key: "n_tag", width: 10 },
    // Adicione mais colunas conforme necessário para outros campos
  ];

  // Buscar dados da tabela de árvores do banco de dados
  //const arvores = await Arvores.findAll();

  // Adicionar dados da tabela ao arquivo Excel
  // arvores.forEach((arvore) => {
  //   worksheet.addRow({
  //     id_arvore: arvore.id_arvore,
  //     id_inventario: arvore.id_inventario,
  //     n_tag: arvore.n_tag,
  //     // Adicione mais campos conforme necessário
  //   });
  // });

  // Salvar o arquivo Excel
  const filename = "arvores.xlsx"; // Nome do arquivo de saída
  await workbook.xlsx.writeFile(filename);
  console.log("Tabela de árvores exportada com sucesso para", filename);
}

module.exports = { exportarTabelaArvores };
