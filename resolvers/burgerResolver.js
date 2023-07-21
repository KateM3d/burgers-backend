const burgersData = require("../data");

const burgerResolver = {
  Query: {
    burgers: () => burgersData,
    burgerByTitle: (parent, args) => {
      const { title } = args;
      return burgersData.find((burger) => burger.title === title);
    },
  },
};

module.exports = burgerResolver;
