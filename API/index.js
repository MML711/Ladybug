import express from "express";
const app = express();

import routes from "./routes/index.js";
// import path from "path";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 4001;

// middleware to acces req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, token"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, PATCH, OPTIONS");
  next();
});

//middleware to handle any CORS issues
app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
    methods: `POST,GET,PUT,DELETE,PATCH,OPTIONS`,
    allowedHeaders: `Origin,X-Requested-With,Content-Type,Accept,Authorization,token`,
  })
);

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
