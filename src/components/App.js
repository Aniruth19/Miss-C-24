import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Landing from './Landing';
import Quiz from './Quiz';
import Layout from './Layout';
import End from './End';

function App() {
  return (
    <ChakraProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Layout><Landing /></Layout>} />
            <Route path="/Quiz" element={<Layout><Quiz /></Layout>} />
            <Route path="/End" element={<Layout><End /></Layout>} />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
