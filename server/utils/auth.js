const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
// require('dotenv').config();

const secret = 'mysecretssshhhhhhh';
const expiration = '5h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req }) {
    // Allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }
    console.log("Received token in authMiddleware:", token); //debugging

    try {
      const { data } = jwt.verify(token, secret, { expiresIn: expiration });
      req.user = data;
    } catch (err) {
      console.error(err);
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    
    const currentTime = new Date().toISOString();
    console.log('Current server time:', currentTime);

    const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    const tokenExpiration = new Date((jwt.decode(token).exp) * 1000).toISOString();
    console.log('Token created with expiration:', tokenExpiration);

    return token;
  }
};
