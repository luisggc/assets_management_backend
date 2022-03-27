var typeDefs = `
type AssetsStatistic {
  companies: Int
  assets: Int
  units: Int
  lowerHealthLevelAsset: Asset
  healthLevelHistory: [healthLevelHistoryItem]
  assetsByField(field: String!): [assetsByFieldItem]
  assetsHealthLevelByField(field: String!): [assetsHealthLevelByFieldItem]
  averageHealthLevelAsset: Float
  assetsByHealthLevel: [assetsByHealthLevelItem]
}

type assetsByHealthLevelItem {
  health_level: Float
  assets: Int
}

type healthLevelHistoryItem {
  datetime: Date
  health_level: Float
}

type assetsByFieldItem {
  field: String
  assets: Int
}

type assetsHealthLevelByFieldItem {
  field: String
  health_level: Float
}

`;

/* 
  averageStatusAsset: [averageStatusAssetItem]
  assetsByStatus: [assetsByStatusItem]
  assetsByUnit: [assetsByUnitItem]
  assetsStatusByUnit 
  
  {
  assetsStatistics {
    lowerStatusAsset{
      name
      health_level
    }
  }
}


  {
  assetsStatistics {
    assetsByField(field: "status") {
      field
      assets
    }
  }
}


  {
  assetsStatistics {
    assetsByField(field: "unit") {
      field
      assets
    }
  }
}

  
  {
  assetsStatistics {
    assetsHealthLevelByField(field: "unit") {
      field
      health_level
    }
  }
}

{
  assetsStatistics {
    assetsHealthLevelByField(field: "unit") {
      field
      health_level
    }
  }
}


  */


var query = `
assetsStatistics: AssetsStatistic
`;


module.exports = {
  typeDefs,
  query
};
