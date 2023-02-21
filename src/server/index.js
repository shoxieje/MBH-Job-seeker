
const express = require("express");
const cors = require("cors");
const multer = require("multer")
const fs = require("fs")
const path = require("path")


const app = express();
const port = 8082;

app.use(express.json());
app.use(cors());
app.use(express.static('static'))

app.use(
    express.urlencoded({
      extended: true,
    })
);

const districtRouter = require('./routes/district')
const seasonalityRouter =  require('./routes/seasonality')
const cropRouter = require('./routes/crop')



app.use("/district", districtRouter)
app.use("/seasonality", seasonalityRouter)
app.use("/crop", cropRouter)

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
