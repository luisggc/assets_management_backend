var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
var mongoose = require("mongoose");

var Asset = require("./models/asset.js");
var Company = require("./models/company.js");
var Unit = require("./models/unit.js");
var User = require("./models/user.js");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`

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
      id_unit: String!
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

// The root provides a resolver function for each API endpoint
var root = {
  assets: () => {
    return Asset.find()
      .then((events) => {
        console.log(events);
        return events;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  createAsset: ({ assetInput }) => {
    const asset = new Asset(assetInput);
    return asset
      .save()
      .then((result) => {
        console.log({ ...result._doc });
        return { ...result._doc };
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  createCompany: ({ name }) => {
    // Could implement validation. Ex: do not allow companies with same name
    const company = new Company({ name });
    return company
      .save()
      .then((result) => {
        console.log({ ...result._doc });
        return { ...result._doc };
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  companies: () => {
    return Company.find()
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  units: () => {
    return Unit.find()
      .populate("company")
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
};

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
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
    console.log("ERRROOOO");
    console.log(url_database);
    console.log(err);
  });

const images = [
  "https://www.heller.biz/fileadmin/Maschinen-Loesungen/00_Maschinenbilder/heller-automation.png",
  "https://www.heller.biz/fileadmin/Maschinen-Loesungen/00_Maschinenbilder/heller-5-achs-bearbeitungszentren-f.png",
  "https://www.heller.biz/fileadmin/Maschinen-Loesungen/00_Maschinenbilder/heller-5-achs-fraes-dreh-bearbeitungszentren-c.png",
  "https://www.heller.biz/fileadmin/Maschinen-Loesungen/00_Maschinenbilder/heller-4-achs-bearbeitungszentren-h.png",
  "https://www.heller.biz/fileadmin/Maschinen-Loesungen/00_Maschinenbilder/heller-4-5-achs-bearbeitungszentren-mc20.png",
  "https://www.heller.biz/fileadmin/Maschinen-Loesungen/00_Maschinenbilder/heller-transferstrassen-systeme-trs.png",
  "https://www.heller.biz/fileadmin/Maschinen-Loesungen/00_Maschinenbilder/heller-beschichtungsmodule-cbc200.png",
  "https://www.heller.biz/fileadmin/Maschinen-Loesungen/00_Maschinenbilder/heller-cnc-profitrainer.png",
];

const status = ["Running", "Alerting", "Stopped"];

const assets = {
  image:
    "https://www.heller.biz/fileadmin/Maschinen-Loesungen/00_Maschinenbilder/heller-automation.png",
  name: "Equipment ABC",
  description:
    "orem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed volutpat odio, sed lacinia odio. Nullam commodo elit mauris, eu rhoncus dui dignissim sed. Maecenas ipsum est, molestie eu magna sit amet, viverra sollicitudin mi. Aenean eleifend non ligula et consectetur. Aliquam ac mauris non tortor semper pulvinar. Phasellus porttitor risus auctor urna tincidunt, at porta turpis fringilla. Phasellus sollicitudin tincidunt ex ut elementum.",
  model: "231",
  owner: "Luis Coimbra",
  status: "Running",
  health_level: 0.4,
  id_unit: 1,
};
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
