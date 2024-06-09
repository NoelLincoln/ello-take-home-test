import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, ListItemText, Modal, CircularProgress, IconButton, Input } from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { GET_ALL_BOOKS_SEARCH } from '../utils/queries';

const cardHeaderStyles = {
    wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
    },
    addBookToListButton: {
        marginLeft: '16px',
        bgcolor: '#5ACCCC',
        color: 'white',
        '&:hover': {
            bgcolor: '#4AB6B9',
        },
    },
};

const SearchBarComponent = () => {
    const [state, setState] = useState({ dataSource: [] });
    const [books, setBooks] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState(() => {
        const savedBooks = localStorage.getItem('selectedBooks');
        return savedBooks ? JSON.parse(savedBooks) : [];
    });
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showDuplicateModal, setShowDuplicateModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [boxVisible, setBoxVisible] = useState(true);

    const [fetchBooks] = useLazyQuery(GET_ALL_BOOKS_SEARCH, {
        onCompleted: (data) => {
            setLoading(false);
            setBooks(data.books_search);
            setSearchPerformed(true);
            setBoxVisible(true); // Show the box when search is completed
        },
    });

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setState({ dataSource: [value] });
    };

    const handleSearchRequest = () => {
        setLoading(true);
        setSearchPerformed(false);
        fetchBooks({ variables: { query: state.dataSource[0] } });
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

    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(state.dataSource[0]?.toLowerCase() || ''));

    return (
        <>
            <Box sx={{ display: 'flex', width: '80%', margin: 'auto', justifyContent: 'center', marginBottom: '2rem', alignItems: 'center', paddingTop: '8rem' }}>
                <SearchIcon sx={{ marginRight: '10px' }} />
                <Input
                    placeholder="Search by title"
                    onChange={handleSearchChange}
                    sx={{ width: '720px', color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.1rem' }}
                />
                <Button
                    variant="contained"
                    onClick={handleSearchRequest}
                    size="large"
                    sx={cardHeaderStyles.addBookToListButton}
                >
                    Search
                </Button>
            </Box>

            {loading && <CircularProgress />}
            {searchPerformed && !loading && filteredBooks.length === 0 && (
                <Typography>No book with that title found!</Typography>
            )}
            {!loading && filteredBooks.length > 0 && boxVisible && (
                <Box sx={{
                    height: '300px',
                    overflowY: 'auto',
                    margin: 'auto',
                    width: '60%',
                    marginBottom: '4rem',
                    border: '1px solid',
                    borderColor: 'grey.400',
                    borderRadius: '8px',
                    padding: '1rem',
                    position: 'relative' // Make the box position relative to position the close button
                }}>
                    <IconButton
                        sx={{ display: 'flex', width:'100%', justifyContent: 'end' }}
                        onClick={() => setBoxVisible(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                    <InfiniteScroll
                        dataLength={filteredBooks.length}
                        loader={<CircularProgress />}
                        endMessage={<Typography>No more books to load</Typography>}
                        sx={{marginTop: '10px'}}
                    >
                        {filteredBooks.map((book) => (
                            <Box key={book.title} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'space-between', flexGrow: 1, minWidth: '200px', flexBasis: '200px', marginBottom: '1rem' }}>
                                <img src={book.coverPhotoURL} alt={book.title} style={{ width: '50px', marginRight: '10px' }} />
                                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', flexGrow: 1 }}>
                                    <ListItemText
                                        primary={book.title}
                                        secondary={book.author}
                                        sx={{ maxWidth: '60%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textWrap: 'wrap' }}
                                    />
                                    <Button
                                        variant="contained"
                                        onClick={() => handleAddBook(book)}
                                        sx={{
                                            borderRadius: '20px',
                                            marginLeft: { xs: '0', sm: '2rem' },
                                            bgcolor: '#5ACCCC',
                                            color: 'white',
                                            '&:hover': {
                                                bgcolor: '#4AB6B9',
                                            },
                                            marginTop: { xs: '1rem', sm: '0' }
                                        }}
                                    >
                                        Add to List
                                    </Button>
                                </Box>
                            </Box>
                        ))}
                    </InfiniteScroll>
                </Box>
            )}

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
                        bgcolor: '#FFC107',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '8px',
                        textAlign: 'center',
                        color: 'black',
                    }}
                >
                    <Typography variant="h5" id="duplicate-book-modal">
                        Book is already in the reading list!
                    </Typography>
                </Box>
            </Modal>
        </>
    );
};

export default SearchBarComponent;
