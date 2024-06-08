import { gql } from '@apollo/client';

export const GET_ALL_BOOKS = gql`
  query GetAllBooks($offset: Int, $limit: Int) {
    books(offset: $offset, limit: $limit) {
      title
      author
      coverPhotoURL
    }
  }
`;