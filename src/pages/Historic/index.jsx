import {
  Box, Flex, Stack,
} from '@chakra-ui/react';
import React from 'react';
import { Header } from '../../components/Header';
import { Task } from '../../components/Task';

export const Historic = () => {
  return (

    <Box min-width="100vw">
      <Header currPage="historic" />
      <Flex justify="center" min-width="100vw" minHeight="calc(100vh - 60px)">
        <Stack spacing="16px">
          {[...Array(61)].map((x, i) => (
            <Task
              title="Lorem Ipsum Lorem Ipsum..."
              description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus, aliquam! Facilis quia beatae quisquam officiis minima ab voluptatum, itaque obcaecati."
              date="10/08/2022"
              time="13:04"
              duration="1h 23m"
              status="Deleted"
              id={i}
            />
          ))}
        </Stack>
      </Flex>
    </Box>

  );
};
