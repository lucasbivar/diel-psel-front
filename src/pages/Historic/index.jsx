/* eslint-disable import/no-cycle */
import {
  Box, Flex, Stack, Heading,
} from '@chakra-ui/react';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Header } from '../../components/Header';
import { Task } from '../../components/Task';
import { getTasks } from '../../api';

export const Historic = () => {
  const { data, isLoading } = useQuery(['historic'], async () => {
    const { tasks } = await getTasks();

    return tasks;
  }, {
    staleTime: 5000,
  });
  return (

    <Box min-width="100vw">
      <Header currPage="historic" />
      <Flex justify="center" min-width="100vw" minHeight="calc(100vh - 60px)">
        <Stack spacing="16px" paddingBottom="30px">
          {(data?.filter(({
            deleted,
          }) => deleted).length === 0) ? <Heading fontSize={{ base: '1rem', md: '1.2rem' }}>Nenhuma Tarefa Foi Deletada :)</Heading>
            : data?.filter(({
              deleted,
            }) => deleted).map(({
              title, description, _id, date, deleted, time, durationToString, status,
            }) => {
              return (
                <Task
                  title={title}
                  description={description}
                  date={date}
                  time={time}
                  duration={durationToString}
                  id={_id}
                  status={status}
                  key={_id}
                  deleted={deleted}
                />
              );
            })}
        </Stack>
      </Flex>
    </Box>

  );
};
