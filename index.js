const express = require("express");
const cors = require("cors");
const routerApi = require("./routes");

const app = express();
const port = 3000;

const whitelist = ["http://localhost:8080", "https://myapp.co"];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("no permitido"));
    }
  },
};
app.use(cors(options));

app.get("/", (req, res) => {
  res.send("Hola mi server en express");
});

routerApi(app);

app.listen(port, () => {
  console.log("Mi port " + port);
});
