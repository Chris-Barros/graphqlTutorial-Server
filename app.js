const mongoose = require("mongoose");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");

require("dotenv").config();

const schema = require("./schema/schema");

const app = express();

//allow cross origin requests
app.use(cors());

mongoose.connect(process.env.MONGOOSE_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("listening for request on port 4000");
});
