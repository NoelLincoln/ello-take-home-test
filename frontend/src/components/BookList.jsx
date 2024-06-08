import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Grid from '@mui/material/Grid';
import { Typography, Box } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { GET_ALL_BOOKS } from '../utils/queries';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 12; // Number of books to fetch at once

  const { loading, error, data, fetchMore } = useQuery(GET_ALL_BOOKS, {
    variables: { offset, limit },
    notifyOnNetworkStatusChange: true, // Ensures the query updates its loading status when `fetchMore` is called
  });

  useEffect(() => {
    if (data && !loading) {
      const newBooks = data.books;
      setBooks(prevBooks => [...prevBooks, ...newBooks]);
      setHasMore(newBooks.length === limit);
    }
  }, [data, loading]);

  const fetchMoreBooks = () => {
    if (hasMore) {
      fetchMore({
        variables: {
          offset: offset + limit,
          limit,
        },
      }).then(({ data }) => {
        const newBooks = data.books;
        setBooks(prevBooks => [...prevBooks, ...newBooks]);
        setHasMore(newBooks.length === limit);
        setOffset(prevOffset => prevOffset + limit);
      });
    }
  };

  if (error) return <div>Error! {error.message}</div>;

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#5ACCCC' }}>
        List of all Books
      </Typography>
      <InfiniteScroll
        dataLength={books.length}
        next={fetchMoreBooks}
        hasMore={hasMore}
        loader={
          <Box sx={{ my: 2, textAlign: 'center', fontStyle: 'italic', color: '#FAAD00' }}>
            Loading...
          </Box>
        }
        endMessage={
          <Box sx={{ my: 2, textAlign: 'center', fontStyle: 'italic', color: '#FAAD00' }}>
            No more books to load
          </Box>
        }
        scrollThreshold={0.9}
      >
        <Grid container spacing={2} justifyContent="center" sx={{ mx: 'auto', width: '80%' }}>
          {books.map(book => (
            <Grid key={book.title} item xs={12} sm={6} md={4} lg={3}>
              <div style={{ textAlign: 'center' }}>
                <img src={book.coverPhotoURL} alt={book.title} style={{ width: '100%' }} />
                <p>{book.title}</p>
              </div>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </>
  );
};

export default BookList;
