var { buildSchema } = require("graphql");
var { makeExecutableSchema } = require("@graphql-tools/schema");
var { constraintDirective, constraintDirectiveTypeDefs } = require("graphql-constraint-directive");
var allSchemas = [require("./company"), require("./asset"), require("./unit"), require("./user")];

var typeSchemas = allSchemas.map((schema) => schema?.typeDefs).join("\n");
var querySchemas = allSchemas.map((schema) => schema?.query).join("\n");
var mutationSchemas = allSchemas.map((schema) => schema?.mutation).join("\n");

var typeDefs = buildSchema(`
  ${typeSchemas}
  type RootQuery {
    ${querySchemas}
  }

  type RootMutation {
    ${mutationSchemas}
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

const schema = makeExecutableSchema({
  typeDefs, schemaDirectives: { constraint: constraintDirective }
})


module.exports = { graphQLSchema: schema };
