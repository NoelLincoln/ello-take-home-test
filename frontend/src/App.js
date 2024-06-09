import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import './App.css';
import Header from './components/Header';
import SearchBarComponent from './components/SearchBarComponent';
import BookList from './components/BookList';
import ReadingList from './components/ReadingList';
import Footer from './components/Footer';
import { GET_ALL_BOOKS, GET_ALL_BOOKS_SEARCH } from './utils/queries';

function App() {
  const [books, setBooks] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 12;

  const { loading, error, data, fetchMore } = useQuery(GET_ALL_BOOKS, {
    variables: { offset, limit },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data && !loading) {
      setBooks(data.books);
    }
  }, [data, loading]);

  const fetchMoreBooks = () => {
    fetchMore({
      variables: {
        offset: offset + limit,
        limit,
      },
    }).then(({ data }) => {
      setBooks(prevBooks => [...prevBooks, ...data.books]);
      setOffset(prevOffset => prevOffset + limit);
    });
  };

  if (error) {
    return (
      <div className="App">
        <Header />
        <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
          <h2>Error: {error.message}</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<><SearchBarComponent /><BookList books={books} fetchMoreBooks={fetchMoreBooks} hasMore={books.length % limit === 0} /></>} />
          <Route path="/home" element={<><SearchBarComponent /><BookList books={books} fetchMoreBooks={fetchMoreBooks} hasMore={books.length % limit === 0} /></>} />
          <Route path="/readinglist" element={<ReadingList />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
