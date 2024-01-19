import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Alert, AlertIcon, AlertTitle, AlertDescription, Button, Badge, Text, Flex, Heading } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { GiTrophyCup } from 'react-icons/gi'; // Import trophy icon
import { FaCrown } from 'react-icons/fa'; // Import crown icon
import { auth } from './ConfigFirebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { database } from './ConfigFirebase';
import { collection, getDocs } from 'firebase/firestore';

const Result = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [userScores, setUserScores] = useState([]);
  const controls = useAnimation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userData) => {
      if (!userData?.email) {
        setShowAlert(true);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    });

    // Fetch user scores from Firestore
    const fetchData = async () => {
      const scoresCollection = collection(database, 'userscores');
      const scoresSnapshot = await getDocs(scoresCollection);
      const scoresData = scoresSnapshot.docs.map((doc) => doc.data());
      setUserScores(scoresData);
    };

    fetchData();

    // Animate the component on mount
    controls.start({ opacity: 1, y: 0 });

    return () => unsubscribe();
  }, [navigate, controls]);

  const logout = () => {
    // Animate the component on logout
    controls.start({ opacity: 0, y: -20 });

    signOut(auth)
      .then(() => {
        setTimeout(() => {
          navigate('/');
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Sort the userScores in descending order based on the score
  const sortedScores = [...userScores].sort((a, b) => b.score - a.score);

  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={controls} exit={{ opacity: 0, y: -20 }}>
      <Box p={4} overflowX="auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Alert status="warning" variant="solid" display={showAlert ? 'flex' : 'none'}>
            <AlertIcon />
            <AlertTitle mr={2}>Unauthorized Access</AlertTitle>
            <AlertDescription>Please log in to access this page.</AlertDescription>
          </Alert>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          {/* Trophy and Leaderboard heading */}
          <Flex alignItems="center" mb={4} justifyContent="center">
            <GiTrophyCup size={32} style={{ marginRight: '8px' }} />
            <Heading size="lg" fontWeight="bold">
              Leaderboard
            </Heading>
          </Flex>

          {/* Note about Resubmissions with custom CSS animation */}
          
          <style>
            {`
              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              .resubmission-note {
                animation: fadeInUp 0.5s ease-in-out;
              }
            `}
          </style>

          {/* Table with scores */}
          <Table variant="striped" colorScheme="gray" size="md">
  <Thead>
    <Tr>
      <Th>Rank</Th>
      <Th>User</Th>
      <Th>Score</Th>
    </Tr>
  </Thead>
  <Tbody>
    {sortedScores.map((userScore, index) => (
      <Tr key={index}>
        <Td>
          {index === 0 ? (
            <Box as={FaCrown} color="gold" size="20px" mr={2} />
          ) : index === 1 ? (
            <Box as={FaCrown} color="silver" size="20px" mr={2} />
          ) : index === 2 ? (
            <Box as={FaCrown} color="bronze" size="20px" mr={2} />
          ) : (
            index + 1
          )}
        </Td>
        <Td>{userScore.name}</Td>
        <Td>
          <Badge
            colorScheme="white"  // Set a single color for the background
            color="black.500"  // Set the text color
          >
            {userScore.score}
          </Badge>
        </Td>
      </Tr>
    ))}
  </Tbody>
</Table>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.5 }}>
          {/* Logout button */}
          <Flex justifyContent="center" my={4}>
            <Button colorScheme="gray" onClick={logout}>
              Logout
            </Button>
          </Flex>
        </motion.div>
        <Text
            fontSize="sm"
            color="red.500"
            fontWeight="bold"
            mb={4}
            textAlign="center"
            className="resubmission-note"
          >
            Note: Resubmissions will not be taken into account.
          </Text>
      </Box>
    </motion.div>
  );
};

export default Result;
