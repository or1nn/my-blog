import express from "express";
import cors from "cors";
import rootRouter from "./routes";
import sequelize from "./db";
import fileUpload from "express-fileupload";
const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.static("static"));
app.use(express.json());
app.use(fileUpload({}));
app.use(rootRouter);

const start = async () => {
  await sequelize.authenticate();
  await sequelize.sync();

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

start();
