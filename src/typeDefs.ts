export const typeDefs = `#graphql
interface IRepository {
  name: String!
  size: Int!
  owner: String!
}

type Repository implements IRepository {
  name: String!
  size: Int!
  owner: String!
}

enum Visibility {
  PRIVATE
  PUBLIC
}

type Webhook {
  id: String!
  url: String!
  name: String!
}

type RepositoryDetails implements IRepository {
  name: String!
  size: Int!
  owner: String!
  visibility: Visibility!
  numberOfFiles: Int!
  ymlContent: String
  webhooks: [Webhook!]!
}

input QueryRepoInput {
  token: String!
}

input QueryRepoDetailsInput {
  token: String!
  name: String!
  owner: String!
}

type Query {
  repositories(input: QueryRepoInput!): [Repository]
  repositoryDetails(input: QueryRepoDetailsInput!): RepositoryDetails
}
`;
