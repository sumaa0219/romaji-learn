import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Quiz from './components/Quiz';
import { gojuon, dakuonHandakuon, youon } from './data/kana';
import AppHeader from './AppHeader';
import Selection from './components/Selection';

const App: React.FC = () => {
  return (
    <div className="App">
      <AppHeader />
      <Container style={{ marginTop: '20px' }}>
        <Routes>
          <Route path="/gojuon" element={<Quiz questions={gojuon} />} />
          <Route path="/dakuon" element={<Quiz questions={dakuonHandakuon} />} />
          <Route path="/youon" element={<Quiz questions={youon} />} />
          <Route path="/" element={<Selection />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
