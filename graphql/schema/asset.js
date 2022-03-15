var typeDefs = `
type Asset {
    _id: ID!
    image: String!
    name: String!
    description: String!
    model: String!
    owner: String!
    status: String!
    health_level: Float!,
    unit: Unit
}

  input AssetInput {
    image: String!
    name: String!
    description: String!
    model: String!
    owner: String!
    status: statusAsset!
    health_level: Float!
    unit: String!
  }

  enum statusAsset {
    Running
    Alerting
    Stopped
  }
`;
var query = `
assets: [Asset!]!
`;

var mutation = `
createAsset(AssetInput: AssetInput): Asset
editAsset(_id: ID!, AssetInput: AssetInput): Asset
deleteAsset(_id: String!): String
`;

module.exports = {
  typeDefs,
  query,
  mutation,
};
