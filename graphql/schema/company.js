var typeDefs = `
type Company {
    _id: ID!
    name: String
}
  
input CompanyInput {
    _id: ID!
    name: String!
}
`;
var query = `
companies: [Company!]!
`;

var mutation = `
createCompany(name: String!): Company
editCompany(CompanyInput: CompanyInput): Company
deleteCompany(_id: ID!): Company
`;

module.exports = {
  typeDefs,
  query,
  mutation,
};
