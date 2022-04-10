var typeDefs = `
type Unit {
  _id: ID!
  name: String!
  company: Company
}

input UnitInput {
  _id: ID!
  name: String
  company: ID
}
`;

var query = `
units: [Unit!]!

`;

var mutation = `
createUnit(name: String!, company: ID!): Unit
editUnit(UnitInput: UnitInput): Unit
deleteUnit(_id: ID!): ID
`;

module.exports = {
  typeDefs,
  query,
  mutation,
};
