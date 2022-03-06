var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var mongoose = require("mongoose");
var { graphQLSchema } = require("./graphql/schema/index");
var { graphQLResolvers } = require("./graphql/resolvers/index");

var app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
});

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
    app.listen(4000);
  })
  .catch((err) => {
    console.log("Erro M ONGODBBBB");
    console.log(err);
  });

console.log("Running a GraphQL API server at http://localhost:4000/graphql");
