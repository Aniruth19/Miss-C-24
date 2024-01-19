import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { auth } from './ConfigFirebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-dom-confetti';

const questions = [
  {
    id: 1,
    question: '/images/question1.jpg',
    options: [
      '/images/answer1_1.jpg',
      '/images/answer1_2.jpg',
      '/images/answer1_3.jpg',
      '/images/answer1_4.jpg',
    ],
    correctAnswer: '/images/answer1_3.jpg',
  },
  {
    id: 2,
    question: '/images/question2.jpg',
    options: [
      '/images/answer2_1.jpg',
      '/images/answer2_2.jpg',
      '/images/answer2_3.jpg',
      '/images/answer2_4.jpg',
    ],
    correctAnswer: '/images/answer2_2.jpg',
  },
  // Add more questions as needed
];

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [score, setScore] = useState(0);
  const [user, setUser] = useState('');

  const handleAnswerChange = (value) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [currentQuestionIndex]: value,
    }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleFinishQuiz = () => {
    let newScore = 0;

    questions.forEach((question, index) => {
      if (selectedOptions[index] === question.correctAnswer) {
        newScore += 1;
      }
    });

    setScore(newScore);

    setTimeout(() => {
      setConfetti(true);
      setShowAlert(true);

      // Navigate to the "Result" page
      navigate('/Result');
    }, 500);
  };

  const confettiConfig = {
    spread: 180,
    elementCount: 100,
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userData) => {
      if (!userData?.email) {
        navigate('/');
      }
      setUser(userData?.email || '');
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <Box p={4}>
      <Card borderRadius="lg">
        <Stack spacing={8} p={8}>
          <Text fontSize="md" color="gray.500" mb={4}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Text>

          <Box mb={4}>
            {/* Use a fixed height for question images */}
            <img src={questions[currentQuestionIndex].question} alt={`Question ${currentQuestionIndex + 1}`} style={{ maxWidth: '100%', height: '200px', objectFit: 'cover' }} />
          </Box>

          <RadioGroup onChange={handleAnswerChange} value={selectedOptions[currentQuestionIndex] || ''}>
            <Stack spacing={2}>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <Radio key={index} value={option}>
                  {/* Use a fixed height for answer images */}
                  <img src={option} alt={`Option ${index + 1}`} style={{ maxWidth: '100%', height: '100px', objectFit: 'cover' }} />
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
          <Stack direction="row" spacing={4}>
            <Button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
              Previous Question
            </Button>
            <Button
              onClick={currentQuestionIndex === questions.length - 1 ? handleFinishQuiz : handleNextQuestion}
              disabled={!selectedOptions[currentQuestionIndex]}
              colorScheme={currentQuestionIndex === questions.length - 1 ? 'green' : 'gray'}
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
            <Button colorScheme="red" onClick={logout}>
              Logout
            </Button>
          </Stack>
        </Stack>
      </Card>

      <Alert status="success" variant="solid" display={showAlert ? 'flex' : 'none'}>
        <AlertIcon />
        <AlertTitle mr={2}>Quiz Completed!</AlertTitle>
        <AlertDescription>Your score is: {score}</AlertDescription>
      </Alert>

      <Confetti active={confetti} config={confettiConfig} />

      {/* Display the currently logged-in user */}
      <Text mt={4} textAlign="center">
        Currently logged in as: {user}
      </Text>
    </Box>
  );
};

export default Quiz;
