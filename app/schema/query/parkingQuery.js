const parkingService = require('../../services/parkingService');
const graphql = require('graphql');

const parkingPlaceObjectType = new graphql.GraphQLObjectType({
  name: 'ParkingPlaceObjectType',
  description: 'Parking place object object',
  fields: function () {
    return {
      name: {
        type: graphql.GraphQLString
      },
      coordinates: {
        type: new graphql.GraphQLList(graphql.GraphQLFloat)
      },
      total: {type: graphql.GraphQLInt},
      free:  {type: graphql.GraphQLInt}
    };
  }
});

const parkingListType = new graphql.GraphQLList(parkingPlaceObjectType);

const parkingQuery = {
  name: 'ParkingQuery',
  description: 'Retrieve parking places',
  type: parkingListType,
  resolve: function (_, parentArgs, args) {
    console.log('args', _, parentArgs, args);
    return parkingService();
  }
};

module.exports = parkingQuery;
