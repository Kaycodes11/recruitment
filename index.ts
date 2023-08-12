import express from "express";
import db from "./models";

const app = express();
const PORT = process.env.PORT || 8080;

db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Server has connected to ${PORT}`));
  })
  .catch((error: any) => {
    console.error(error.message);
  });
