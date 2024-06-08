import React, { useState, useEffect } from 'react';
import { Box, MenuItem, FormControl, InputLabel, Select, TextField, Typography, Button, ListItemText, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLazyQuery } from '@apollo/client';
import { GET_ALL_BOOKS } from '../utils/queries';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState(() => {
    const savedBooks = localStorage.getItem('selectedBooks');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State to control the select menu
  const [offset, setOffset] = useState(0);
  const limit = 10; // Number of books to fetch at once

  const [fetchBooks] = useLazyQuery(GET_ALL_BOOKS, {
    onCompleted: (data) => {
      const sortedBooks = data.books.slice().sort((a, b) => a.title.localeCompare(b.title));
      setBooks((prevBooks) => [...prevBooks, ...sortedBooks]);
    },
  });

  useEffect(() => {
    fetchBooks({ variables: { offset, limit } });
  }, [fetchBooks, offset, limit]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleAddBook = (book) => {
    const updatedBooks = [...selectedBooks, book];
    setSelectedBooks(updatedBooks);
    localStorage.setItem('selectedBooks', JSON.stringify(updatedBooks));
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 2000);
  };

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const filteredBooks = books
    .filter(book => book.title.toLowerCase().includes(searchText.toLowerCase()))
    .filter(book => !selectedBooks.some(selectedBook => selectedBook.title === book.title));

  const fetchMoreBooks = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" paddingTop={12}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: '#5ACCCC' }}>
          Search For Your Favorite Books!
        </Typography>
        <TextField
          label="Filter by title"
          variant="outlined"
          placeholder="Type parts of the title, click the dropdown below"
          value={searchText}
          onChange={handleSearchChange}
          style={{ marginBottom: '16px', width: '80%' }}
        />
        <FormControl style={{ minWidth: '200px', width: '80%', marginBottom: '2em', marginTop: '1em' }}>
          <InputLabel id="select-multiple-label" shrink></InputLabel>
          <Select
            labelId="select-multiple-label"
            id="select-multiple"
            multiple
            value={selectedBooks}
            onOpen={handleMenuOpen}
            onClose={handleMenuClose}
            open={menuOpen}
            renderValue={() => 'Click to select Books'}
          >
            <MenuItem>
              <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                Select Books
                <IconButton onClick={handleMenuClose} size="small" sx={{ position: 'absolute', top: 5, right: 5 }}>
                  <CloseIcon />
                </IconButton>
              </Typography>
            </MenuItem>
            <InfiniteScroll
              dataLength={filteredBooks.length}
              next={fetchMoreBooks}
              hasMore={filteredBooks.length === limit}
              loader={<h4>Loading...</h4>}
              endMessage={<p style={{ textAlign: 'center' }}>No more books to load</p>}
            >
              {filteredBooks.length === 0 ? (
                <MenuItem disabled>
                  <Typography>No book with that title found
                    <br />check if it is already in the reading list!</Typography>
                </MenuItem>
              ) : (
                filteredBooks.map((book) => (
                  <MenuItem key={book.title} value={book} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60%' }}>
                    <img src={book.coverPhotoURL} alt={book.title} style={{ width: '50px', marginRight: '10px' }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                      <ListItemText
                        primary={book.title}
                        secondary={book.author}
                        sx={{ maxWidth: '60%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textWrap: 'wrap' }}
                      />
                      <div style={{ marginLeft: '10px' }}>
                        <Button
                          variant="contained"
                          onClick={() => handleAddBook(book)}
                          sx={{
                            borderRadius: '20px',
                            bgcolor: '#5ACCCC',
                            color: 'white',
                            '&:hover': {
                              bgcolor: '#4AB6B9',
                            },
                          }}
                        >
                          Add to List
                        </Button>
                      </div>
                    </Box>
                  </MenuItem>
                ))
              )}
            </InfiniteScroll>
          </Select>
        </FormControl>
        <Modal
          open={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          aria-labelledby="successfully-added-modal"
          aria-describedby="successfully-added-message"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: '#4CAF50',
              boxShadow: 24,
              p: 4,
              borderRadius: '8px',
              textAlign: 'center',
              color: 'white',
            }}
          >
            <Typography variant="h5" id="successfully-added-modal">
              Successfully Added!
            </Typography>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default SearchBar;
