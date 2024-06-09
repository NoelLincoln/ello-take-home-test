export type Book = {
    title: string;
    author: string;
    coverPhotoURL: string;
    readingLevel: string;
  };
  
export type QueryBooksArgs = {
    offset: number;
    limit: number;
  };
  