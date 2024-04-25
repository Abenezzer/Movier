const express = require("express");
const { default: mongoose } = require("mongoose");
const movies = require("./routes/movies");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const rentals = require("./routes/rentals");
const users = require("./routes/users");

mongoose
  .connect("mongodb://127.0.0.1:27017/myVidly")
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => {
    console.log(e);
    return;
  });

const app = express();
app.use(express.json());
app.use("/api/movies", movies);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/rentals",rentals );
app.use("/api/users",users );
app.get("/", (req, res) => {
  res.send("<h1>Hello Vidlyt</h1>");
});

const port = process.env.NODE_ENV ?? 3000;

app.listen(port, () => console.log(`Server Listining at ${port}...`));
