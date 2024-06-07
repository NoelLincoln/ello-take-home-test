import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Button, Typography } from '@mui/material';

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
      <h2>Reading List</h2>
      {books.length === 0 ? (
        <Typography variant="h5" align="center">
          No books added yet
        </Typography>
      ) : (
        <List sx={{ width: '80%' }}>
          {books.map((book) => (
            <ListItem key={book.title} sx={{ display: 'flex', alignItems: 'center' }}>
              <img src={book.coverPhotoURL} alt={book.title} style={{ width: '100px', marginRight: '10px' }} />
              <Box sx={{ flex: '1 1 auto', minWidth: 0 }}>
                <ListItemText primary={book.title} secondary={book.author} />
              </Box>
              <Box sx={{ flexShrink: 0, marginLeft: '10px' }}>
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
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ReadingList;
