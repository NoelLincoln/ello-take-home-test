import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography, Box } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';

const BookList = ({ books, fetchMoreBooks, hasMore, loading }) => {
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
