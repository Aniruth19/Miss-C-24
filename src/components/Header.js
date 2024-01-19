import { Link as ChakraLink, Box, Flex,Text, Button } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';


const Header = () => {
  return (
    <Box
      as="header"
      borderBottomWidth="1px"
      width="full"
      height="4rem">
      <Box width="full" mx="auto" px={6} pr={[1, 6]} height="100%">
        <Flex
          size="100%"
          p={[0, 6]}
          pl={[0, 4]}
          align="center"
          justify="space-between">
          
          <Flex align="center">
            <ChakraLink href="/Result">
              <Button size="sm" mr={3}>Results</Button>
            </ChakraLink>

            <ChakraLink
              isExternal
              href="https://github.com/Aniruth19/Miss-C-24">
              <Box as={FaGithub} size="25px" />
            </ChakraLink>
          </Flex>

        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
