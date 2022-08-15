import {
  Box, Flex, Heading, Stack, Text, Button, HStack,
} from '@chakra-ui/react';
import React from 'react';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AlarmIcon from '@mui/icons-material/Alarm';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { getTaskById } from '../../api';
import { formatTime } from '../../utils';

export const Details = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error } = useQuery(['edit-todo', { id }], async () => {
    const { tasks } = await getTaskById(id);

    return tasks;
  }, {
    staleTime: 5000,
  });

  if (error) navigate('/error');

  return (
    <Box min-width="100vw">
      <Header />
      <Flex justify="center" min-width="100vw" minHeight="calc(100vh - 90px)">
        <Stack marginBottom="20px" width={{ base: '80%', xl: '50%' }}>
          <Heading fontSize={{ base: '1rem', md: '2rem' }}>{data?.title}</Heading>
          <Flex align="center">
            <CalendarMonthIcon style={{ width: '1.3rem' }} />
            <Text marginLeft="0.2rem" fontSize={{ base: '0.9rem', lg: '1rem' }}>{data?.date}</Text>
          </Flex>
          <Flex align="center">
            <ScheduleIcon style={{ width: '1.3rem' }} />
            <Text marginLeft="0.2rem" fontSize={{ base: '0.9rem', lg: '1rem' }}>{(data ? formatTime(data.dateTime) : '')}</Text>
          </Flex>
          <Flex align="center">
            <AlarmIcon style={{ width: '1.3rem' }} />
            <Text marginLeft="0.2rem" fontSize={{ base: '0.9rem', lg: '1rem' }}>{data?.durationToString}</Text>
          </Flex>
          <Text fontSize={{ base: '0.9rem', lg: '1rem' }} textAlign="justify">
            {data?.description}
          </Text>
          <HStack justify="right">
            <Link to={`/editar/${id}`}><Button colorScheme="brand">Editar</Button></Link>
            <Link to="/"><Button float="right" colorScheme="brand">Voltar</Button></Link>
          </HStack>

        </Stack>
      </Flex>
    </Box>
  );
};
