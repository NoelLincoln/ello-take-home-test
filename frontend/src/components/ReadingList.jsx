import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';

const ReadingList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const storedBooks = localStorage.getItem('selectedBooks');
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);

  const handleRemoveBook = (bookToRemove) => {
    const updatedBooks = books.filter(book => book.title !== bookToRemove.title);
    setBooks(updatedBooks);
    localStorage.setItem('selectedBooks', JSON.stringify(updatedBooks));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" paddingTop={12}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#5ACCCC' }}>
        Reading List
      </Typography>
      {books.length === 0 ? (
        <Typography variant="h5" align="center">
          No books added yet
        </Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center" sx={{ width: '80%' }}>
          {books.map((book) => (
            <Grid key={book.title} item xs={12} sm={6} md={4} lg={3}>
              <Box sx={{ textAlign: 'center' }}>
                <img src={book.coverPhotoURL} alt={book.title} style={{ width: '100%' }} />
                <Typography variant="subtitle1">{book.title}</Typography>
                <Button
                  variant="contained"
                  onClick={() => handleRemoveBook(book)}
                  sx={{
                    borderRadius: '20px',
                    bgcolor: '#F76434',
                    color: 'white',
                    '&:hover': {
                      bgcolor: '#E55E2B',
                    },
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ReadingList;
