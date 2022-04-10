var typeDefs = `
type User {
  _id: ID!
  name: String!
  company: Company
}

input UserInput {
  _id: ID!
  name: String!
  company: ID!
}
`;
var query = `
users: [User!]!
`;

var mutation = `
createUser(name: String!, company: ID!): User
editUser(UserInput: UserInput): User
deleteUUser(_id: ID!): ID
`;

module.exports = {
  typeDefs,
  query,
  mutation,
};
