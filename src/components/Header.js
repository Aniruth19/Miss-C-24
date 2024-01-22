// Header.jsx

import { Link as ChakraLink, Box, Flex, Button, Image, Text } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../components/ConfigFirebase';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleResultsClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/Result');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box as="header" borderBottomWidth="1px" width="full" height="4rem" textAlign="center">
      <Flex align="center" justify="space-between" px={6} height="100%">
        <Flex align="center">
          <Button size="sm" mr={3} onClick={handleResultsClick}>
            Results
          </Button>
          <ChakraLink isExternal href="https://github.com/Aniruth19/Miss-C-24">
            <Box as={FaGithub} size="40px" />
          </ChakraLink>
        </Flex>
        <Image src="/logo.png" alt="Logo" boxSize="95px" />
      </Flex>
    </Box>
  );
};

export default Header;
