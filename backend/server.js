// starta todos os serviços

const database = require("./src/db");
const app = require("./src/app");

app.listen(process.env.PORT, () => {
  console.log("App is running at " + process.env.PORT);
});
