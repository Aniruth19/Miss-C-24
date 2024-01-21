import { Link as ChakraLink, Box, Flex, Button, Image } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
const Header = () => {
  return (
    <Box as="header" borderBottomWidth="1px" width="full" height="4rem" textAlign="center">
      <Flex align="center" justify="space-between" px={6} height="100%">
        <Flex align="center">
          <ChakraLink href="/Result">
            <Button size="sm" mr={3}>Results</Button>
          </ChakraLink>
          <ChakraLink isExternal href="https://github.com/Aniruth19/Miss-C-24">
          <Box as={FaGithub} size="25px" />
          </ChakraLink>
        </Flex>
        <Image src="/logo.png" alt="Logo" boxSize="95px" />
      </Flex>
    </Box>
  );
};
export default Header;
