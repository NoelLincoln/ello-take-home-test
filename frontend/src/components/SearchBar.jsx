import React, { useState, useEffect } from 'react';
import { Box, MenuItem, FormControl, InputLabel, Select, TextField, Button, ListItemText, ListItemSecondaryAction } from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import { GET_ALL_BOOKS } from '../utils/queries'; // Import the query for fetching books

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);

  const [fetchBooks] = useLazyQuery(GET_ALL_BOOKS, {
    onCompleted: (data) => {
      // Sort books alphabetically by title
      const sortedBooks = data.books.slice().sort((a, b) => a.title.localeCompare(b.title));
      setBooks(sortedBooks);
    },
  });

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleAddBook = (book) => {
    setSelectedBooks((prevSelectedBooks) => [...prevSelectedBooks, book]);
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="center" paddingTop={12}>
      <TextField
        label="Filter by title"
        variant="outlined"
        value={searchText}
        onChange={handleSearchChange}
        style={{ marginBottom: '16px', width: '80%' }}
      />
      <FormControl style={{ minWidth: '200px', width: '80%', marginBottom: '2em', marginTop: '1em' }}>
        <InputLabel id="select-multiple-label" shrink>Select Books</InputLabel>
        <Select
          labelId="select-multiple-label"
          id="select-multiple"
          multiple
          value={selectedBooks}
          onChange={() => {}}
          renderValue={(selected) => selected.map(book => book.title).join(', ')}
        >
          {filteredBooks.map((book) => (
            <MenuItem key={book.title} value={book} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
                <ListItemText primary={book.title} secondary={book.author} />
              </Box>
              <ListItemSecondaryAction>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddBook(book)}
                  disabled={selectedBooks.includes(book)}
                >
                  Add to List
                </Button>
              </ListItemSecondaryAction>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchBar;
