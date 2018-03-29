import { AppBar, Box, Link, Toolbar, Typography } from '@mui/material';
import React from 'react';

/**
 * Header component.
 */
const Header = () => {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar>
        <Toolbar>
          <Link href="/" sx={{ textDecoration: 'none', flexGrow: 1 }}>
            <Typography sx={{ color: 'white', fontWeight: '600' }}>Dog Poster Generator</Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;