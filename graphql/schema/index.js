var { buildSchema } = require("graphql");

var graphQLSchema = buildSchema(`

type Company {
  _id: ID!
  name: String!
}

type Unit {
  _id: ID!
  name: String!
  company: Company!
}

type User {
  _id: ID!
  name: String!
}

type Asset {
    _id: ID!
    image: String!
    name: String!
    description: String!
    model: String!
    owner: String!
    status: String!
    health_level: Float!,
    unit: Unit!
}

  input AssetInput {
    image: String!
      name: String!
      description: String!
      model: String!
      owner: String!
      status: String!
      health_level: Float!,
      unit: String!
  }

  type RootQuery {
    assets: [Asset!]!
    companies: [Company!]!
    units: [Unit!]!
    users: [User!]!
  }

  type RootMutation {
    createAsset(assetInput: AssetInput): Asset
    createCompany(name: String!): Company
    createUnit(name: String!): Unit
    createUser(name: String!): User
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

module.exports = { graphQLSchema };
