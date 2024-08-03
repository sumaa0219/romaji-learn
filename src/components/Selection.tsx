import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const Selection: React.FC = () => {
    const navigate = useNavigate();

    const handleSelect = (path: string, isRandom: boolean) => {
        navigate(`${path}?random=${isRandom}`);
    };

    return (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>問題の種類</TableCell>
                        <TableCell>順番</TableCell>
                        <TableCell>ランダム</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Step1 50音</TableCell>
                        <TableCell>
                            <Button variant="contained" onClick={() => handleSelect('/gojuon', false)}>順番</Button>
                        </TableCell>
                        <TableCell>
                            <Button variant="contained" onClick={() => handleSelect('/gojuon', true)}>ランダム</Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Step2 濁音・半濁音・小文字</TableCell>
                        <TableCell>
                            <Button variant="contained" onClick={() => handleSelect('/dakuon', false)}>順番</Button>
                        </TableCell>
                        <TableCell>
                            <Button variant="contained" onClick={() => handleSelect('/dakuon', true)}>ランダム</Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Step3 拗音</TableCell>
                        <TableCell>
                            <Button variant="contained" onClick={() => handleSelect('/youon', false)}>順番</Button>
                        </TableCell>
                        <TableCell>
                            <Button variant="contained" onClick={() => handleSelect('/youon', true)}>ランダム</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Selection;
