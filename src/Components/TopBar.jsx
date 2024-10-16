import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Navigate } from 'react-router-dom';


const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: alpha(theme.palette.background.default, 0.4),
    boxShadow: theme.shadows[1],
    padding: '0px 12px',
  }));


function TopBar(currentView){


    return (
        <AppBar
        position="static"
        sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', mt: 0 }}
      >
        <Container maxWidth="lg">
          <StyledToolbar variant="dense" disableGutters>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>

              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button variant= {currentView == "Home" ? "contained" : "outlined"} color="info" size="small" disabled = {currentView == "Home"} onClick={Navigate("/")}>
                  Home
                </Button>
                <Button variant="outlined" color="info" size="small">
                  Testimonials
                </Button>
                <Button variant="outlined" color="info" size="small">
                  Highlights
                </Button>
                <Button variant="outlined" color="info" size="small">
                  Pricing
                </Button>
                <Button variant="outlined" color="info" size="small" sx={{ minWidth: 0 }}>
                  FAQ
                </Button>
                <Button variant="outlined" color="info" size="small" sx={{ minWidth: 0 }}>
                  Blog
                </Button>
              </Box>
            </Box>
          </StyledToolbar>
        </Container>
        
      </AppBar>
    )
}

export default TopBar;