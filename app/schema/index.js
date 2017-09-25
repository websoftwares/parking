const graphql = require('graphql');
const parkingQuery = require('./query/parkingQuery');
const schema = exports;

// The main schema
schema.root = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      parking: parkingQuery,
    }
  })
});
