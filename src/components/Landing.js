import React, { useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './ConfigFirebase';
import { Heading, Button, Box } from '@chakra-ui/react';
import Typewriter from 'typewriter-effect';
import { useNavigate } from 'react-router-dom';

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
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      textAlign="center"
    >
      <Heading as="h1" size="xl" fontWeight="black" mb="6">
        CAN YOU FIND THE MIS_SING C_DE?
      </Heading>

      <Typewriter
        options={{
          strings: ['30 questions', '30 minutes', 'Can you figure it out?'],
          autoStart: true,
          loop: true,
        }}
      />

      <Button mt="8" onClick={login}>
        GET STARTED
      </Button> 
    </Box>
  );
};

export default Landing;
