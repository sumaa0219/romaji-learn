import React, { useState, useRef, useEffect } from 'react';
import { Button, TextField, Typography, FormControlLabel, Switch, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system';

interface QuestionProps {
    kana: string;
    romaji: string[];
    onAnswer: (isCorrect: boolean, isMistake: boolean) => void;
    onRestart: () => void;
}

const Container = styled('div')(({ isError }: { isError: boolean }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: '20px auto',
    backgroundColor: isError ? 'rgba(255, 0, 0, 0.1)' : 'transparent',
    transition: 'background-color 0.3s ease',
}));

const KanaText = styled(Typography)({
    fontSize: '2em',
    marginBottom: '10px',
});

const AnswerGuide = styled(Typography)({
    marginTop: '10px',
    fontSize: '1.2em',
    color: '#666',
});

const Question: React.FC<QuestionProps> = ({ kana, romaji, onAnswer, onRestart }) => {
    const [input, setInput] = useState("");
    const [isUppercase, setIsUppercase] = useState(false);
    const [showGuide, setShowGuide] = useState(false);
    const [isError, setIsError] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const errorSound = new Audio('/sounds/error.mp3');
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleInputTypeWarning = (event: KeyboardEvent) => {
            const char = event.key;
            if (!/^[a-zA-Z]*$/.test(char) && char !== 'Backspace') {
                setShowWarning(true);
            }
        };

        window.addEventListener('keydown', handleInputTypeWarning);
        return () => {
            window.removeEventListener('keydown', handleInputTypeWarning);
        };
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const currentRomaji = romaji.find(r => r.toLowerCase().startsWith(value.toLowerCase()));

        if (currentRomaji) {
            setInput(value);
            if (value.toLowerCase() === currentRomaji.toLowerCase()) {
                handleSubmit(value, false);
            }
        } else {
            triggerError();
        }
    };

    const handleSubmit = (value: string, isMistake: boolean) => {
        const isCorrect = romaji.some(r => value.toLowerCase() === r.toLowerCase());
        onAnswer(isCorrect, isMistake);
        if (!isMistake) {
            setInput("");
        }
    };

    const triggerError = () => {
        errorSound.play();
        setIsError(true);
        onAnswer(false, true); // ミスとして記録
        setTimeout(() => setIsError(false), 300);
    };

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsUppercase(event.target.checked);
    };

    const toggleGuide = () => {
        setShowGuide(prev => !prev);
    };

    const handleCloseWarning = () => {
        setShowWarning(false);
    };

    const displayedInput = isUppercase ? input.toUpperCase() : input;
    const displayedAnswer = isUppercase ? romaji.map(r => r.toUpperCase()).join(', ') : romaji.join(', ');

    return (
        <Container ref={containerRef} isError={isError}>
            <KanaText>{kana}</KanaText>
            {showGuide && (
                <AnswerGuide>
                    答え: {displayedAnswer}
                </AnswerGuide>
            )}
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(input, false); }}>
                <TextField
                    InputProps={{ style: { border: 'none', outline: 'none' } }} // 枠を隠す
                    value={displayedInput}
                    onChange={handleChange}
                    inputProps={{ style: { textTransform: isUppercase ? 'uppercase' : 'lowercase' } }} // 大文字・小文字の設定
                    autoFocus
                />
            </form>
            <Button onClick={toggleGuide} variant="contained" style={{ marginTop: '10px' }}>
                {showGuide ? 'ガイドを隠す' : 'ガイドを表示'}
            </Button>
            <FormControlLabel
                control={<Switch checked={isUppercase} onChange={handleSwitchChange} />}
                label="大文字/小文字"
            />
            <Button onClick={onRestart} variant="contained" style={{ marginTop: '10px' }}>
                リスタート
            </Button>
            <Snackbar open={showWarning} autoHideDuration={3000} onClose={handleCloseWarning}>
                <Alert onClose={handleCloseWarning} severity="warning">
                    キーボードの入力タイプを英語にしてください。
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Question;
