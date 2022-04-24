var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var mongoose = require("mongoose");
var { graphQLSchema } = require("./graphql/schema/index");
var { graphQLResolvers } = require("./graphql/resolvers/index");
var cors = require("cors");

var app = express();

app.use(cors())
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true,
  })
);

var url_database = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.jnunr.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose
  .connect(url_database)
  .then(() => {
    app.listen(process.env.PORT || 4000);
  })
  .catch((err) => {
    console.log("Erro MONGODBBBB");
    console.log(err);
  });
