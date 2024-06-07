import React from 'react'
import logo from '../logo.svg';
import Box from '@mui/material/Box';

const Header = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '0 20px' }}>
          <img src={logo} alt="logo" style={{ marginRight: '16px' }} />
          <Box component="ul" sx={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0 }}>
            <Box component="li" sx={{ marginRight: '16px' }}>
              About
            </Box>
            <Box component="li" sx={{ marginRight: '16px' }}>
              Services
            </Box>
            <Box component="li" sx={{ marginRight: '16px' }}>
              Contact
            </Box>
          </Box>
        </Box>
  )
}

export default Header