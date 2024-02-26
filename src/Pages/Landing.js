import React, { useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../components/ConfigFirebase';
import { Heading, Button, Box, Text } from '@chakra-ui/react';
import Typewriter from 'typewriter-effect';
import { useNavigate } from 'react-router-dom';
import { Player, Controls } from '@lottiefiles/react-lottie-player';

const Landing = () => {
  const navigate = useNavigate();

  const login = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res, 'userData');
        navigate('/Quiz');
      })
      .catch((err) => {
        console.log(err, 'error');
      });
  };

  useEffect(() => {
    auth.onAuthStateChanged((userData) => {
      console.log(userData);
      if (userData?.email) {
        navigate('/Quiz');
      }
    });

    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      textAlign="center"
    >
      <div>
        <Player
          autoplay
          loop
          src="/search.json"
          style={{ height: '220px', width: '400px', overflow: 'hidden', zIndex: 1, margin: 0, padding: 0 }}
        >
          <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
        </Player>
      </div>
      <Heading as="h1" size="xl" fontWeight="black" mb="6">
        <Text fontSize="3xl" fontWeight="bold" color="gray.700" display="inline">
          CAN YOU FIND THE
        </Text>
        <Text fontSize="4xl" fontWeight="extrabold" color="red.300" display="inline">
          {' <MI_SING C_DE/>'}
        </Text>
      </Heading>

      <div style={{ fontSize: '24px' }}>
        <Typewriter
          options={{
            strings: ['30 Questions', '45 minutes', 'Can you find the missing piece of code?'],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
      <Button mt="8" onClick={login} size="lg">
        GET STARTED
      </Button>
    </Box>
  );
};

export default Landing;
