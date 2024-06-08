import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import ReadingList from './components/ReadingList';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<><SearchBar /><BookList /></>} />
          <Route path="/home" element={<><SearchBar /><BookList /></>} />
          <Route path="/readinglist" element={<ReadingList />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
