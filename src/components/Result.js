import React, { useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Alert, AlertIcon, AlertTitle, AlertDescription, Button } from '@chakra-ui/react';
import { auth } from './ConfigFirebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Result = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = React.useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userData) => {
      if (!userData?.email) {
        setShowAlert(true);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Assuming you have a list of user scores
  const userScores = [
    { user: 'User1', score: 10 },
    { user: 'User2', score: 8 },
    // Add more user scores as needed
    // ...
    { user: 'User50', score: 5 },
  ];

  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box p={4} overflowX="auto">
      <Alert status="warning" variant="solid" display={showAlert ? 'flex' : 'none'}>
        <AlertIcon />
        <AlertTitle mr={2}>Unauthorized Access</AlertTitle>
        <AlertDescription>Please log in to access this page.</AlertDescription>
      </Alert>
      <Table variant="striped" colorScheme="teal" size="md">
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Score</Th>
          </Tr>
        </Thead>
        <Tbody>
          {userScores.map((userScore, index) => (
            <Tr key={index}>
              <Td>{userScore.user}</Td>
              <Td>{userScore.score}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button colorScheme="red" mt={4} onClick={logout}>
        Logout
      </Button>
    </Box>
  );
};

export default Result;
