import * as React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';


function NavTabs() {
    return (
        <Box sx={{ margin: '15px' }}>
            <Button variant="outlined" sx={{ margin: '15px' }}>
                <Link to='/profiles'>Profiles</Link>
            </Button>
            <Button variant="outlined">
                <Link to='/summary/:id'>Profile summary</Link>
            </Button>
        </Box>
    );
}

export default NavTabs;