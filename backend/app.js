const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());

const PORT =  8000;

app.use("/rest/v1", routes);

app.get("/*", (req, res) => {
  res.send("Welcome to the Node app");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
``
