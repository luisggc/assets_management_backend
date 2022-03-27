var companyResolvers = require("./company.js");
var unitResolvers = require("./unit.js");
var assetResolvers = require("./asset.js");
var userResolvers = require("./user.js");
var statisticResolvers = require("./statistic.js");

var graphQLResolvers = {
  ...companyResolvers,
  ...unitResolvers,
  ...assetResolvers,
  ...userResolvers,
  ...statisticResolvers,
};

module.exports = { graphQLResolvers };
