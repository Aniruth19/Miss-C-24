import { Stack, Flex, useColorMode } from '@chakra-ui/react'; // Adjust the import for useColorMode
import Header from './Header';


const Layout = ({ children }) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: 'gray.50', dark: 'gray.900' };
  const color = { light: 'gray.900', dark: 'gray.50' };

  return (
    <>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        bg={bgColor[colorMode]}
        color={color[colorMode]}
        minH="100vh">
        <Header />
        <Stack
          direction="column"
          justify="center"
          align="center"
          flexGrow={1}
          width={['100%', 'xl', 'xl', 'xl']}
          spacing={8}>
          {children}
        </Stack>

      </Flex>
    </>
  );
};

export default Layout;
