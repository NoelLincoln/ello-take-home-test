import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const theme = createTheme();

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ThemeProvider theme={theme}>
  <ApolloProvider client={client}>
    <CssBaseline />
    <App />
    </ApolloProvider>,
    </ThemeProvider>
  </React.StrictMode>
);
