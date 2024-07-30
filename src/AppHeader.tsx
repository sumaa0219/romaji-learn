import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const AppHeader: React.FC = () => {
    const navigate = useNavigate();

    const handleTitleClick = () => {
        navigate('/');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1, cursor: 'pointer' }} onClick={handleTitleClick}>
                    ローマ字学習アプリ
                </Typography>
                <Button color="inherit" component={Link} to="/gojuon">
                    50音
                </Button>
                <Button color="inherit" component={Link} to="/dakuon">
                    濁音・半濁音
                </Button>
                <Button color="inherit" component={Link} to="/youon">
                    拗音
                </Button>
                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default AppHeader;
