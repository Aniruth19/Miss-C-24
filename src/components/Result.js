import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Alert,
  AlertIcon,
  AlertTitle,
  Badge,
  Text,
  Flex,
  Heading,
} from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { GiTrophyCup } from 'react-icons/gi';
import { FaCrown } from 'react-icons/fa';
import { auth } from './ConfigFirebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { database } from './ConfigFirebase';

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
        }, 2000);
      }
    });


    const fetchData = async () => {
      const scoresCollection = collection(database, 'userscores');
      const scoresSnapshot = await getDocs(scoresCollection);
      const scoresData = scoresSnapshot.docs.map((doc) => doc.data());
      setUserScores(scoresData);
    };

    fetchData();

    controls.start({ opacity: 1, y: 0 });

    return () => unsubscribe();
  }, [navigate, controls]);

  const logout = () => {
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

  const sortedScores = [...userScores].sort((a, b) => b.score - a.score);

  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={controls} exit={{ opacity: 0, y: -20 }}>
      <Box p={4} overflowX="auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Alert status="warning" variant="solid" display={showAlert ? 'flex' : 'none'}>
            <AlertIcon />
            <AlertTitle mr={2}>Unauthorized Access</AlertTitle>
            <Text>Please log in and complete the Quiz to access this page.</Text>
          </Alert>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Flex alignItems="center" mb={4} justifyContent="center" pt={4} pb={4}>
            <GiTrophyCup size={32} style={{ marginRight: '8px' }} />
            <Heading size="lg" fontWeight="bold">
              Leaderboard
            </Heading>
          </Flex>
          <Table variant="striped" colorScheme="gray" size="md">
            <Thead>
              <Tr>
                <Th>Rank</Th>
                <Th>User</Th>
                <Th>Score</Th>
                <Th>Time of Submission</Th>
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
                    <Badge colorScheme="white" color="black.900">
                      {userScore.score}
                    </Badge>
                  </Td>
                  <Td>{userScore.timeofsub}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.5 }}>
          <Flex justifyContent="center" my={4}>
            <Button colorScheme="red" onClick={logout}>
              Logout
            </Button>
          </Flex>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Text
            fontSize="sm"
            color="red.500"
            fontWeight="bold"
            fontStyle="italic"
            mb={4}
            textAlign="center"
            className="resubmission-note"
          >
            <span style={{ fontStyle: 'normal', color: 'black' }}>Note:</span> Resubmissions will not be taken into account.
          </Text>
        
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src="/creator.gif" 
              alt="Creator GIF"
              style={{ 
                maxWidth: '50%', 
                maxHeight: '50%', 
                marginTop: '220px',
                opacity: 0.8,
                borderRadius: '20px'
              }}
            />
          </div>
          <Text
            fontSize="sm"
            fontStyle="italic"
            color="gray.500"
            textAlign="center"
            mt={4}
          >Created by <motion.span animate={{ fontStyle: 'normal', color: '#E53E3E' }}>Aniruth</motion.span>
          </Text>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default Result;
