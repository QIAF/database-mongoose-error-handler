require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");


const DB = process.env.DATABASE;

mongoose.connect(DB).then((con) => {
	console.log('connection ke database sukses');
});

const app = express();

const customerRouter = require("./routes/customerRoutes");

// middleware untuk membaca json dari request body ke kita
app.use(express.json());

// middleware dari third party = 3rd party middleware
app.use(morgan("dev"));

// middleware kita sendiri
app.use((req, res, next) => {
  console.log("Hello FSW 1, ini middleware kita sendiri..");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/customers", customerRouter);

module.exports = app;
