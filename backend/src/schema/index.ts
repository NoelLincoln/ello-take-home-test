export const typeDefs = `#graphql
  scalar Int

  type Book {
    title: String
    author: String
    coverPhotoURL: String
  }

  type Query {
    books(offset: Int, limit: Int): [Book]
  }
`;