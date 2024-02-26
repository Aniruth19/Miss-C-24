import React from 'react';
import { Stack, Heading, Text, List, ListItem } from '@chakra-ui/react';

const Rules = () => {
  const pinStyle = { marginRight: '8px', fontSize: '1.2em', color: 'red.500' };

  return (
    <Stack
      borderWidth="2px"
      borderColor="red.300"
      rounded="lg"
      width="100%"
      p={6}
      spacing={5}
      maxHeight="80vh"
      bgColor="gray.50"
      boxShadow="lg"
    >
      <Heading as="h2" alignSelf="center" fontSize="xl" fontWeight="bold" color="red.500">
        The Rules
      </Heading>
      <Text color="gray.600">
        <center><strong>Here are the rules to get you started:</strong></center>
      </Text>
      <List as="ol" spacing={3}>
        <ListItem>
          <span role="img" aria-label="Pin" style={pinStyle}>📌</span>
          Avoid switching tabs or refreshing the page while attending the contest.
        </ListItem>
        <ListItem>
          <span role="img" aria-label="Pin" style={pinStyle}>📌</span>
          It is not compulsory to answer all the questions.
        </ListItem>
        <ListItem>
          <span role="img" aria-label="Pin" style={pinStyle}>📌</span>
          For each correct option selected, you get 1 point and wrong answers won't affect your score.
        </ListItem>
        <ListItem>
          <span role="img" aria-label="Pin" style={pinStyle}>📌</span>
          The event lasts for only 45 minutes, so be quick!
        </ListItem>
        <ListItem>
          <span role="img" aria-label="Pin" style={pinStyle}>📌</span>
          Check how you rank on our leaderboard📈
        </ListItem>
        <ListItem>
          <span role="img" aria-label="Pin" style={pinStyle}>📌</span>
          The Winners will recieve their rewards in the evening.
        </ListItem>
      </List>
    </Stack>
  );
};

export default Rules;
