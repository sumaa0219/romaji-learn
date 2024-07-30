import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Question from './Question';
import Results from './Results';

interface KanaQuestion {
    kana: string;
    romaji: string[];
}

interface QuizProps {
    questions: KanaQuestion[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState<KanaQuestion[]>([]);
    const [incorrectAnswers, setIncorrectAnswers] = useState<KanaQuestion[]>([]);
    const [mistakeCount, setMistakeCount] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [retryQuestions, setRetryQuestions] = useState<KanaQuestion[]>([]);
    const location = useLocation();
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);
    const isRandom = params.get('random') === 'true';

    const currentQuestions = retryQuestions.length > 0 ? retryQuestions : questions;

    useEffect(() => {
        if (isRandom) {
            shuffleQuestions();
        }
    }, [location]);

    const shuffleQuestions = () => {
        const shuffled = [...questions].sort(() => Math.random() - 0.5);
        setRetryQuestions(shuffled);
    };

    useEffect(() => {
        if (currentQuestion >= currentQuestions.length) {
            setQuizFinished(true);
        }
    }, [currentQuestion, currentQuestions.length]);

    const handleAnswer = (isCorrect: boolean, isMistake: boolean) => {
        if (isCorrect) {
            setCorrectAnswers([...correctAnswers, currentQuestions[currentQuestion]]);
        } else {
            setIncorrectAnswers([...incorrectAnswers, currentQuestions[currentQuestion]]);
        }

        if (isMistake) {
            setMistakeCount(mistakeCount + 1);
        }

        if (currentQuestion < currentQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setQuizFinished(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setCorrectAnswers([]);
        setIncorrectAnswers([]);
        setMistakeCount(0);
        setQuizFinished(false);
        setRetryQuestions([]);
        navigate(`${location.pathname}?random=${isRandom}`);
    };

    const handleRetry = () => {
        setCurrentQuestion(0);
        setCorrectAnswers([]);
        setMistakeCount(0);
        setQuizFinished(false);
        setRetryQuestions(incorrectAnswers);
        setIncorrectAnswers([]);
    };

    const totalInputs = correctAnswers.length + incorrectAnswers.length;
    const incorrectInputs = mistakeCount;
    const accuracy = totalInputs > 0 ? (correctAnswers.length / totalInputs) * 100 : 0;
    const difficultKeys = incorrectAnswers.map(q => q.kana);

    return (
        <div>
            {quizFinished ? (
                <Results
                    totalInputs={totalInputs}
                    incorrectInputs={incorrectInputs}
                    accuracy={accuracy}
                    difficultKeys={difficultKeys}
                    onRetry={handleRetry}
                    onRestart={handleRestart}
                />
            ) : (
                <Question
                    kana={currentQuestions[currentQuestion].kana}
                    romaji={currentQuestions[currentQuestion].romaji}
                    onAnswer={handleAnswer}
                    onRestart={handleRestart}
                />
            )}
        </div>
    );
};

export default Quiz;
