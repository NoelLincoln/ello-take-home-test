import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Header/>
      </header>
      <SearchBar/>
      <BookList/>
    </div>
  );
}

export default App;
