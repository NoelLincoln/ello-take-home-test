import { booksData } from '../data/books';

export const resolvers = {
  Query: {
    books: (_: unknown, { offset = 0, limit = 10 }: { offset: number; limit: number }) => {
      const sortedBooks = booksData.sort((a, b) => a.title.localeCompare(b.title));
      const startIndex = offset;
      const endIndex = offset + limit;
      return sortedBooks.slice(startIndex, endIndex);
    },
    books_search: () => {
      return booksData.sort((a, b) => a.title.localeCompare(b.title));
    },
  },
};