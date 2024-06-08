import { booksData } from '../data/books';
import { QueryBooksArgs } from '../types';

export const resolvers = {
  Query: {
    books: (_: unknown, { offset = 0, limit = 10 }: QueryBooksArgs) => {
      const startIndex = offset;
      const endIndex = offset + limit;
      return booksData.slice(startIndex, endIndex);
    },
  },
};