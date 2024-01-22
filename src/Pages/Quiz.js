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
  Collapse,
  Image,
  VStack,
} from '@chakra-ui/react';
import Confetti from 'react-dom-confetti';
import { auth } from '../components/ConfigFirebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { database } from '../components/ConfigFirebase';
import { collection, addDoc } from 'firebase/firestore';
import questions from '../components/Questions';

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [user, setUser] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleAnswerChange = (value) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [currentQuestionIndex]: value,
    }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setShowHint(false); // Reset hint visibility for the next question
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setShowHint(false); // Reset hint visibility for the previous question
  };

  const handleFinishQuiz = async () => {
    let newScore = 0;

    questions.forEach((question, index) => {
      if (selectedOptions[index] === question.correctAnswer) {
        newScore += 1;
      }
    });

    setScore(newScore);
    setShowAlert(true);
    setConfetti(true);

    const currentTime = new Date();
    const timeOfSubmission = currentTime.toLocaleTimeString('en-US', { hour12: true });

    const scoresCollection = collection(database, 'userscores');
    await addDoc(scoresCollection, {
      name: user,
      score: newScore,
      timeofsub: timeOfSubmission,
    });

    setTimeout(() => {
      navigate('/Result');
    }, 800);
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

  const confettiConfig = {
    spread: 200,
    elementCount: 200,
  };

  return (
    <Box p={4} overflow="auto">
      <Card borderRadius="lg">
        <Stack spacing={4} p={8} textAlign="center">
          <Text fontSize="md" color="gray.500" mb={2}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Text>
          <VStack align="center" spacing={4} maxH="600px" overflow="auto">
            <Image
              src={questions[currentQuestionIndex].question}
              alt={`Question ${currentQuestionIndex + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
            <Text mb={1}>{questions[currentQuestionIndex].input}</Text>
            <Text mb={1}>{questions[currentQuestionIndex].output}</Text>
          </VStack>
          <Collapse in={showHint} unmountOnExit>
            <Text fontSize="sm" color="black.500" mb={2}>
              {questions[currentQuestionIndex].hint}
            </Text>
          </Collapse>

          <Box
            mb={2}
            fontSize="l"
            color="red"
            cursor="pointer"
            onClick={() => setShowHint(!showHint)}
            transition="color 0.3s"
            _hover={{ color: 'blue.500' }}
          >
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </Box>

          <RadioGroup onChange={handleAnswerChange} value={selectedOptions[currentQuestionIndex] || ''}>
            <Stack spacing={2}>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <Radio key={index} value={option}>
                  <img
                    src={option}
                    alt={`Option ${index + 1}`}
                    style={{ maxWidth: '100%', height: 'auto', maxHeight: '100px', width: 'auto', objectFit: 'contain' }}
                  />
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
          <Stack direction="row" spacing={4} ml={6}>
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
            <Button colorScheme="red" onClick={logout} ml={6}>
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
      <Text mt={4} textAlign="center">
        Currently logged in as: {user}
      </Text>
    </Box>
  );
};

export default Quiz;
