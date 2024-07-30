import React from 'react';
import { Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ResultsProps {
    totalInputs: number;
    incorrectInputs: number;
    accuracy: number;
    difficultKeys: string[];
    onRetry: () => void;
    onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ totalInputs, incorrectInputs, accuracy, difficultKeys, onRetry, onRestart }) => {
    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/');
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>今回のタイピング結果</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>全体の入力数</TableCell>
                            <TableCell>{totalInputs}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>正確率</TableCell>
                            <TableCell>{accuracy.toFixed(2)}%</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>ミス入力</TableCell>
                            <TableCell>{incorrectInputs}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>ミスした文字</TableCell>
                            <TableCell>{difficultKeys.join(', ')}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Box mt={2}>
                <Button variant="contained" color="primary" onClick={onRetry} style={{ marginRight: '10px' }}>
                    ミスだけ
                </Button>
                <Button variant="contained" color="secondary" onClick={onRestart}>
                    もう1回
                </Button>
                <Button variant="contained" onClick={handleHome} style={{ marginLeft: '10px' }}>
                    ホーム
                </Button>
            </Box>
        </Box>
    );
};

export default Results;
