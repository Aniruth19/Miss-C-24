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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import Confetti from 'react-dom-confetti';
import { auth } from '../components/ConfigFirebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import questions from '../components/Questions';
import { database } from '../components/ConfigFirebase';

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [user, setUser] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [logoutConfirmation, setLogoutConfirmation] = useState(false);
  const cancelRef = React.useRef();

  const handleAnswerChange = (value) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [currentQuestionIndex]: value,
    }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setShowHint(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setShowHint(false);
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

  const handleLogout = () => {
    setLogoutConfirmation(true);
  };

  const logout = () => {
    setLogoutConfirmation(false);
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
          <Text fontSize="md" color="gray.600" mb={2}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Text>
          <VStack align="center" spacing={4} maxH="600px" overflow="auto">
            <Image
              src={questions[currentQuestionIndex].question}
              alt={`Question ${currentQuestionIndex + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
            <Text mb={1}><strong>INPUT : </strong>{questions[currentQuestionIndex].input}</Text>
            <Text mb={1}><strong>OUTPUT : </strong>{questions[currentQuestionIndex].output}</Text>
          </VStack>
          <Collapse in={showHint} unmountOnExit>
            <Text fontSize="sm" color="black.500" mb={2}>
              {questions[currentQuestionIndex].hint}
            </Text>
          </Collapse>

          <Box
            mb={2}
            fontSize="l"
            color="red.400"
            cursor="pointer"
            onClick={() => setShowHint(!showHint)}
            transition="color 0.3s"
            _hover={{ color: 'blue.500' }}
            fontWeight="bold" 
          >
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </Box>

          <RadioGroup onChange={handleAnswerChange} value={selectedOptions[currentQuestionIndex] || ''}>
            <Stack spacing={5} paddingBottom={3}>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <Radio key={index} value={option} fontSize="xl">
                  {option}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
          <Stack direction="row" spacing={7} ml={6}>
            <Button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0} mx={2}>
              Previous Question
            </Button>
            <Button
              onClick={
                currentQuestionIndex === questions.length - 1
                  ? handleFinishQuiz
                  : handleNextQuestion
              }
              disabled={!selectedOptions[currentQuestionIndex]}
              colorScheme={
                currentQuestionIndex === questions.length - 1 ? 'green' : 'blue'
              }
              mx={7}
            >
              {currentQuestionIndex === questions.length - 1
                ? 'Finish Quiz'
                : 'Next Question'}
            </Button>
            <Button colorScheme="red" onClick={handleLogout} ml={4} mx={10}>
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
      <Text mt={6} pt={12} textAlign="center">
        Currently logged in as: {user}
      </Text>

      <AlertDialog
        isOpen={logoutConfirmation}
        leastDestructiveRef={cancelRef}
        onClose={() => setLogoutConfirmation(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Logout Confirmation
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to logout? Your progress will be lost.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setLogoutConfirmation(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={logout} ml={3}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Quiz;
