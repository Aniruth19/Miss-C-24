import { Link as ChakraLink, Box, Flex, Button, Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../components/ConfigFirebase';
import { useNavigate } from 'react-router-dom';
import Rules from './Rules';

const Header = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <Button mr={3} onClick={handleResultsClick}>
            Results
          </Button>
          <ChakraLink isExternal href="https://github.com/Aniruth19/Miss-C-24" mr={3}>
            <Box as={FaGithub} size="40px" />
          </ChakraLink>
          <Button onClick={onOpen}>Rulebook</Button>
          
        </Flex>
        <Image src="/logo.png" alt="Logo" boxSize="95px" />

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
            <ModalContent bg="red.50" opacity={0} transform="translateY(-10px)" transition="opacity 0.7s, transform 0.7s" borderRadius="xl">
            <ModalHeader>Rulebook</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Rules />
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Got it!</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Box>
  );
};

export default Header;
