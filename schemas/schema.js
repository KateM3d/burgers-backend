const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
} = require("graphql");
const BurgerType = require("../models/burgerModel");
const resolvers = require("../resolvers/index");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    burgers: {
      type: new GraphQLList(BurgerType),
      resolve() {
        return resolvers.Query.burgers;
      },
    },
    burgerByTitle: {
      type: BurgerType,
      args: {
        title: { type: GraphQLString },
      },
      resolve(parent, args) {
        return resolvers.Query.burgerByTitle(parent, args);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
