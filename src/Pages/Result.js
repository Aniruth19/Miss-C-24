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
  Badge,
  Flex,
  Heading,
  Link as ChakraLink,
  Text,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { GiTrophyCup } from 'react-icons/gi';
import { FaCrown } from 'react-icons/fa';
import { auth } from '../components/ConfigFirebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../components/ConfigFirebase';

const Result = () => {
  const navigate = useNavigate();
  const [userScores, setUserScores] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userData) => {
      if (!userData?.email) {
        onOpen();
        setTimeout(() => {
          navigate('/');
        }, 400);
      }
    });

    const fetchData = async () => {
      const scoresCollection = collection(database, 'userscores');
      const scoresSnapshot = await getDocs(scoresCollection);
      const scoresData = scoresSnapshot.docs.map((doc) => doc.data());
      setUserScores(scoresData);
    };
    fetchData();

    return () => unsubscribe();
  }, [navigate, onOpen]);

  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sortedScores = [...userScores].sort((a, b) => b.score - a.score);

  return (
    <Box p={4} overflowX="auto">
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={undefined}
        onClose={onClose}
        isCentered
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
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="red" onClick={logout} ml={3}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Flex alignItems="center" mb={4} justifyContent="center" pt={4} pb={4}>
        <GiTrophyCup size={32} style={{ marginRight: '8px' }} />
        <Heading size="lg" fontWeight="bold">
          Leaderboard
        </Heading>
      </Flex>
      <Table variant="simple" colorScheme="gray" size="md">
        <Thead>
          <Tr>
            <Th>Rank</Th>
            <Th textAlign="center">User</Th>
            <Th textAlign="center">Score</Th>
            <Th width="200px" textAlign="center">
              Time of Submission
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedScores.map((userScore, index) => (
            <Tr key={index} _hover={{ bg: 'red.100', transition: 'background-color 0.3s ease-in-out' }}>
              <Td>
                {index === 0 ? (
                  <Box as={FaCrown} color="gold" size="20px" mr={2} />
                ) : index === 1 ? (
                  <Box as={FaCrown} color="silver" size="20px" mr={2} />
                ) : index === 2 ? (
                  <Box as={FaCrown} size="20px" mr={2} style={{ color: '#cd7f32' }} />
                ) : (
                  index + 1
                )}
              </Td>
              <Td>{userScore.name}</Td>
              <Td textAlign="center">
                <Badge colorScheme="white" color="black.900">
                  {userScore.score}
                </Badge>
              </Td>
              <Td style={{ fontSize: '14px' }} textAlign="center">
                {userScore.timeofsub}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Flex justifyContent="center" my={4}>
        <Button colorScheme="red" onClick={onOpen}>
          Logout
        </Button>
      </Flex>
      <Text fontSize="sm" color="red.500" fontStyle="italic" mb={4} textAlign="center">
        <span style={{ fontStyle: 'normal', color: 'black' }}>Note:</span> Resubmissions will not be taken into account*
      </Text>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src="/creator.gif"
          alt="Creator GIF"
          style={{
            maxWidth: '50%',
            maxHeight: '50%',
            marginTop: '90px',
            opacity: 0.8,
            borderRadius: '20px',
          }}
        />
      </div>
      <Text fontSize="sm" fontStyle="italic" color="gray.500" textAlign="center" mt={2}>
        A webpage by{' '}
        <ChakraLink href="https://www.instagram.com/aniruth_19/" target="_blank" rel="noopener noreferrer">
          <span style={{ fontStyle: 'normal', color: '#E53E3E', cursor: 'pointer' }}>
            Aniruth
          </span>
        </ChakraLink>
      </Text>
    </Box>
  );
};

export default Result;
