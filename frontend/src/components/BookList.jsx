import React from 'react';
import { useQuery } from '@apollo/client';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { GET_ALL_BOOKS } from '../utils/queries';


const BookList = () => {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! ${error.message}</div>;

  // Create a copy of the books array and then sort the copied array
  const sortedBooks = [...data.books].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <>
    <Typography variant="h4" align="center" gutterBottom sx={{ color: '#5ACCCC' }}>List of all Books</Typography>
    <Grid container spacing={2} justifyContent="center" sx={{ mx: 'auto', width: '80%' }}>
      {sortedBooks.map(book => (
        <Grid key={book.title} item xs={12} sm={6} md={4} lg={3}>
          <div style={{ textAlign: 'center' }}>
            <img src={book.coverPhotoURL} alt={book.title} style={{ width: '100%' }} />
            <p>{book.title}</p>
          </div>
        </Grid>
      ))}
    </Grid>
  </>
  );
};

export default BookList;
