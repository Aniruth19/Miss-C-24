import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../Pages/Landing';
import Quiz from '../Pages/Quiz';
import Layout from './Layout';
import Result from '../Pages/Result';
function App() {
  return (  
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Layout><Landing /></Layout>} />
            <Route path="/Quiz" element={<Layout><Quiz /></Layout>} />
            <Route path="/Result" element={<Layout><Result /></Layout>} />
          </Routes>
        </Router>
      </div>
  );
}
export default App;
