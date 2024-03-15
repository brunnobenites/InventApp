"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("arvores", [
      {
        n_tag: 1,
        especie: "Aroeira",
        altura: 8,
        cap1: 30,
        cap2: 33,
        cap3: 40,
        cap4: 22.4,
        cap5: 10,
        cap6: 5.5,
        cap7: 1.0,
        cap8: 0.5,
        cap9: 0.8,
        cap10: 11.1,
        endereco: "Rua dos Cafezais, 123",
        latitude: -23.55052,
        longitude: -46.633308,
        foto1: "caminho/para/foto1.jpg",
        foto2: "caminho/para/foto2.jpg",
        justificativa:
          "Esta árvore foi plantada como parte de um projeto de reflorestamento.",
        id_inventario: 1,
        legfoto1: "Legenda da foto 1",
        legfoto2: "Legenda da foto 2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Adicione mais objetos para inserir mais registros
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("arvores", null, {});
  },
};
