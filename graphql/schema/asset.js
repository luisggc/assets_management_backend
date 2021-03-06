var typeDefs = `

scalar Date

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

  type AssetLog {
    _id: ID!
    type: String!
    datetime: Date!
    asset: Asset
    responsible: User
    value: Float!
    updatedAt: Date!
    createdAt: Date!
  }

  input AssetLogInput {
    type: typeAssetLog!
    datetime: Date
    asset: ID!
    value: Float!
    responsible: String!
  }

  enum typeAssetLog {
    HealthLevel
    Status
  }

  
`;


var query = `
assets: [Asset!]!
assetsLogs: [AssetLog]
assetsLog(_id: ID!): [AssetLog]
`;

var mutation = `
createAsset(AssetInput: AssetInput): Asset
editAsset(_id: ID!, AssetInput: AssetInput): Asset
deleteAsset(_id: ID!): Asset
createAssetLog(AssetLogInput: AssetLogInput): AssetLog
deleteAssetLog(_id: ID!): AssetLog
`;

module.exports = {
  typeDefs,
  query,
  mutation,
};
