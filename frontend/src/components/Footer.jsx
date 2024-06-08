import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
        width: '100%',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Linc Enterprises
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <Link href="https://noellincoln.github.io" color="inherit" underline="none">
          noellincoln.github.io
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
