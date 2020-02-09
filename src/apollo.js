import ApolloClient from 'apollo-boost';

export default new ApolloClient(
  {
    uri: "https://boulderapp.azurewebsites.net/graphql",
  }
);