'use strict';

const graphql = require('graphql');
const isEmpty = require('lodash.isempty');
const schema = require('./app/schema');

module.exports.graphqlHandler = function (event, context, callback) {
  console.log('Incoming Event', event);
  let variables = event.variables && !isEmpty(event.variables) ? JSON.parse(event.variables) : {};

  if(event.headers['Content-Type'] === 'application/graphql') {
    event.body  =  Buffer.from(event.body, 'base64').toString();
  }

  graphql.graphql(schema.root, event.body, null, variables)
    .then(data => {
      callback(null,  {
        "statusCode": 200,
        "body": JSON.stringify(data.data)
      })
    })
    .catch(err => callback(err))
};

