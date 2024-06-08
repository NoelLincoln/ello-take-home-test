import { booksData } from '../data/books';
import { QueryBooksArgs } from '../types';

export const resolvers = {
  Query: {
    books: (_: unknown, { offset = 0, limit = 10 }: QueryBooksArgs) => {
      const sortedBooks = booksData.sort((a, b) => a.title.localeCompare(b.title));
      const startIndex = offset;
      const endIndex = offset + limit;
      return sortedBooks.slice(startIndex, endIndex);
    },
  },
};