const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");

const BurgerType = new GraphQLObjectType({
  name: "Burger",
  fields: {
    image: { type: GraphQLString },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    price: { type: GraphQLInt },
    gramms: { type: GraphQLInt },
    basePrice: { type: GraphQLInt },
  },
});

module.exports = BurgerType;
