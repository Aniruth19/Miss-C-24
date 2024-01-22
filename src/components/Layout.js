import { Stack, Flex, useColorMode } from '@chakra-ui/react';
import Header from './Header';
import { Player, Controls } from '@lottiefiles/react-lottie-player';


const Layout = ({ children }) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: 'gray.50'};
  const color = { light: 'gray.900'};

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
          width={['100%', 'xl', 'xl', '3xl']}
          spacing={8}>
          {children}
        </Stack>
      </Flex>
    </>
  );
};

export default Layout;
