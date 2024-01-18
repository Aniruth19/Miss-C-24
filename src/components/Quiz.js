import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import {
  Box,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Button,
  Alert,
  AlertIcon,
  Spinner,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { auth } from './ConfigFirebase';
import Confetti from 'react-dom-confetti';

const questions = [
  {
    id: 1,
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswer: 'Paris',
  },
  {
    id: 2,
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Mars',
  },
  // Add more questions as needed
];

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [scores, setScores] = useState(0);
  const [showScores, setShowScores] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const handleNextOrSubmit = () => {
    if (currentQuestion === questions.length - 1) {
      // Last question, calculate scores
      calculateScores();
    } else {
      // Not the last question, move to the next
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedAnswer(null);
    }
  };

  const handlePrev = () => {
    setCurrentQuestion((prevQuestion) => Math.max(prevQuestion - 1, 0));
    setSelectedAnswer(null);
  };

  const handleAnswerChange = (value) => {
    // Use the callback form of setState to ensure the state is updated correctly
    setSelectedAnswer(() => value);
  };

  const calculateScores = () => {
    // Simulating the calculation of scores with a timeout
    setLoading(true);
    setTimeout(() => {
      const currentQuestionData = questions[currentQuestion];
      const isCorrect = selectedAnswer === currentQuestionData.correctAnswer;
      setScores((prevScores) => (isCorrect ? prevScores + 1 : prevScores));
      setShowScores(true);
      setLoading(false);
      setConfetti(true);
    }, 1000); // Simulating an asynchronous operation with a timeout
  };

  // Logout logic
  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Check if the user is authenticated
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userData) => {
      console.log(userData, 'userData');
      if (!userData?.email) {
        // If not authenticated, navigate to login page
        navigate('/');
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [navigate]);

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Heading mb={4}>Quiz Card</Heading>
      {showScores ? (
        <Alert status="success" mb={4}>
          <AlertIcon />
          Your total score is {scores} out of {questions.length}.
        </Alert>
      ) : (
        <Stack spacing={4}>
          <Heading as="h3" size="md">
            {questions[currentQuestion].question}
          </Heading>
          <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
            <Stack spacing={2}>
              {questions[currentQuestion].options.map((option, index) => (
                <Radio key={index} value={option}>
                  {option}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
          <Stack mt={4} direction="row" spacing={4}>
            <Button colorScheme="blue" onClick={handlePrev} isDisabled={currentQuestion === 0}>
              Prev
            </Button>
            {loading ? (
              <Button colorScheme="green" isLoading loadingText="Submitting">
                Submit
              </Button>
            ) : (
              <>
                {currentQuestion === questions.length - 1 ? (
                  <Button colorScheme="green" onClick={handleNextOrSubmit}>
                    Submit
                  </Button>
                ) : (
                  <Button colorScheme="blue" onClick={handleNextOrSubmit}>
                    Next
                  </Button>
                )}
              </>
            )}
          </Stack>
        </Stack>
      )}
      <Confetti active={confetti} config={{ spread: 180, elementCount: 100 }} />
      <Button mt={4} colorScheme="red" onClick={logout}>
        Logout
      </Button>
    </Box>
  );
};

export default Quiz;
