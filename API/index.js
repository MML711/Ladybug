import express from "express";
const app = express();

import routes from "./routes/index.js";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 4001;

// middleware to acces req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//middleware to handle any CORS issues
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, token"
  );
  if (req.method === "options") {
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, PATCH");
    return res.status(200).json({});
  }
  next();
});

app.use("/api", routes);

/* if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
}); */

app.listen(PORT, () => {
  console.log(`API Server now listening on port ${PORT}`);
});
