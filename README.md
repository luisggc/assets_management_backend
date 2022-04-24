# 🛠️ Assets Management

Backend of a full responsive CRUD app where the user can register companies, units, assets and users.

- Live backend: [https://assets-manag.herokuapp.com/graphql](https://assets-manag.herokuapp.com/graphql)
- See a live demo of the frontend here: [https://asset-manag-react.herokuapp.com/](https://asset-manag-react.herokuapp.com/)
- Frontend code here: [https://github.com/luisggc/assets_management_frontend](https://github.com/luisggc/assets_management_frontend)

## 🎯 Requirements

- Each asset must have an image, name, description, model, owner, status and health level;
- Each asset is part of a unit;
- Each unit is part of a company;
- Every user is part of a company;
- There are three types of status: Running, Alerting, Stopped;
- Health level needs to be between 0% to 100%.

Backend made using Express, GraphQL, Mongoose and MongoDB.

## 📌 Screenshots

![graphiQL](graphiQL.gif)