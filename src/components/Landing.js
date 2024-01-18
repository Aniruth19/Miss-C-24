import { Heading, Text, Button } from '@chakra-ui/react';
import Typewriter from 'typewriter-effect';

const Landing = () => (
  <>
    <Heading as="h1" size="xl" fontWeight="black">
      CAN YOU FIND THE MIS_SING C_DE?
    </Heading>

    <Typewriter 
  options={{
    strings: [
      "30 questions",
      "30 minutes",
      "Can you figure it out?",
    ],
    autoStart: true,
    loop: true,
  }}
/>

    <Button mt="8" variantColor="purple">
      GET STARTED
    </Button>
  </>
);

export default Landing;
