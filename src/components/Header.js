import { Link as ChakraLink, Box, Flex, Button } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

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
          {/* Removed the Logo component */}
          <Flex align="center">
            <ChakraLink href="/score">
              <Button size="sm" mr={3}>Score Board</Button>
            </ChakraLink>

            <ChakraLink
              isExternal
              href="https://github.com/Aniruth19">
              <Box as={FaGithub} size="25px" />
            </ChakraLink>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
