import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchText);
  };

  return (
    <Box display="flex" width="100%" justifyContent="center" paddingTop={2} paddingBottom={2} marginTop={8} overflow="visible">
      <Box
        display="flex"
        alignItems="center"
        borderRadius="20px"
        overflow="hidden"
        sx={{ position: 'relative' }}
      >
        <TextField
          label="Search by title"
          variant="outlined"
          value={searchText}
          onChange={handleSearchChange}
          style={{ marginRight: '8px', width: '80%', borderRadius: 20 }}
          InputProps={{ sx: { borderRadius: 20 } }}
        />
        <Button
        variant="contained"
        onClick={handleSearch}
        style={{ borderRadius: 20 }}
         >
        Search 
      </Button> 
     </Box>
    </Box>
  );
  
  
  
};

export default SearchBar;
