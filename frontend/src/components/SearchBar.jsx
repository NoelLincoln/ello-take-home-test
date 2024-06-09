import React, { useState, useEffect } from 'react';
import { Box, MenuItem, FormControl, InputLabel, Select, TextField, Typography, Button, ListItemText, Modal, CircularProgress, IconButton } from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import InfiniteScroll from 'react-infinite-scroll-component';
import { GET_ALL_BOOKS_SEARCH } from '../utils/queries';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState(() => {
    const savedBooks = localStorage.getItem('selectedBooks');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [fetchBooks, { loading, data }] = useLazyQuery(GET_ALL_BOOKS_SEARCH);

  useEffect(() => {
    if (data && !loading) {
      setBooks(data.books_search);
    }
  }, [data, loading]);

  const handleSearchFieldClick = () => {
    fetchBooks();
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleMenuOpen = () => {
    setMenuOpen(true);
    handleSearchFieldClick();
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleAddBook = (book) => {
    const isBookAlreadySelected = selectedBooks.some(selectedBook => selectedBook.title === book.title);

    if (isBookAlreadySelected) {
      setShowDuplicateModal(true);
      setTimeout(() => {
        setShowDuplicateModal(false);
      }, 3000);
    } else {
      const updatedBooks = [...selectedBooks, book];
      setSelectedBooks(updatedBooks);
      localStorage.setItem('selectedBooks', JSON.stringify(updatedBooks));
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    }
  };

  const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchText.toLowerCase()));

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
            renderValue={() => (loading ? <CircularProgress size={24} /> : 'Click to select Books')}
          >
            <MenuItem>
              <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                Select Books
                <IconButton onClick={handleMenuClose} size="small" sx={{ position: 'absolute', top: 5, right: 5 }}>
                  <CloseIcon />
                </IconButton>
              </Typography>
            </MenuItem>
            {loading ? (
              <MenuItem disabled>
                <CircularProgress size={24} />
              </MenuItem>
            ) : filteredBooks.length === 0 ? (
              <MenuItem disabled>
                <Typography>No book with that title found
                  <br />check if it is already in the reading list!</Typography>
              </MenuItem>
            ) : (
              <InfiniteScroll
                dataLength={filteredBooks.length}
                next={fetchBooks}
                hasMore={filteredBooks.length === 10}
                loader={<MenuItem disabled><CircularProgress size={24} /></MenuItem>}
                endMessage={<MenuItem disabled><Typography>No more books to load</Typography></MenuItem>}
              >
                {filteredBooks.map((book) => (
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
                ))}
              </InfiniteScroll>
            )}
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
        <Modal
          open={showDuplicateModal}
          onClose={() => setShowDuplicateModal(false)}
          aria-labelledby="duplicate-book-modal"
          aria-describedby="duplicate-book-message"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: '#FAAD00',
              boxShadow: 24,
              p: 4,
              borderRadius: '8px',
              textAlign: 'center',
              color: '#FFF',
            }}
          >
            <Typography variant="h5" id="duplicate-book-modal">
              Book is already in the reading list!
            </Typography>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default SearchBar;
