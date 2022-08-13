import {
  Box, Flex, Heading, Stack, Text, Link, Button, HStack,
} from '@chakra-ui/react';
import React from 'react';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AlarmIcon from '@mui/icons-material/Alarm';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Header } from '../../components/Header';

export const Details = (props) => {
  const id = 123;
  return (
    <Box min-width="100vw">
      <Header />
      <Flex justify="center" min-width="100vw" minHeight="calc(100vh - 90px)">
        <Stack marginBottom="20px" width={{ base: '80%', xl: '50%' }}>
          <Heading fontSize={{ base: '1rem', md: '2rem' }}>Lorem Ipsum Lorem Ipsum...</Heading>
          <Flex align="center">
            <CalendarMonthIcon style={{ width: '1.3rem' }} />
            <Text marginLeft="0.2rem" fontSize={{ base: '0.9rem', lg: '1rem' }}>10/08/2022</Text>
          </Flex>
          <Flex align="center">
            <ScheduleIcon style={{ width: '1.3rem' }} />
            <Text marginLeft="0.2rem" fontSize={{ base: '0.9rem', lg: '1rem' }}>13:04</Text>
          </Flex>
          <Flex align="center">
            <AlarmIcon style={{ width: '1.3rem' }} />
            <Text marginLeft="0.2rem" fontSize={{ base: '0.9rem', lg: '1rem' }}>1h 23m</Text>
          </Flex>
          <Text fontSize={{ base: '0.9rem', lg: '1rem' }} textAlign="justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Inventore magnam asperiores amet, explicabo vitae totam
            tenetur quasi dolorem ducimus architecto nostrum praesentium
            recusandae atque, quibusdam sunt sint blanditiis sit aliquid
            dolorum reprehenderit veniam itaque, eum molestias. A ipsam
            ut quam aliquid voluptatem optio perferendis? Eum, accusamus
            consequuntur dolor magnam consequatur non temporibus quas nemo,
            voluptatem incidunt inventore tempora voluptas blanditiis, unde
            provident minima? Voluptate consectetur ullam quisquam dolore
            veritatis minima animi cumque nulla ab ex est deleniti aut,
            odio, neque delectus excepturi illo totam a! Excepturi maiores
            quos non magnam qui minus eveniet quae, libero quidem! Quod
            necessitatibus eaque eius maxime natus atque exercitationem
            veritatis, dolorum minus dicta, nihil ipsum sit rerum sed
            suscipit, nostrum deserunt in neque vero. Porro, iste deleniti
            perferendis quos ullam tempore ab optio dolorum quae suscipit
            doloribus similique vero esse autem nam est? Aspernatur itaque,
            repellat ducimus excepturi architecto ea quo consequatur
            laboriosam tempora soluta.
          </Text>
          <HStack justify="right">
            <Link href={`/editar/${id}`}><Button colorScheme="brand">Editar</Button></Link>
            <Link href="/"><Button float="right" colorScheme="brand">Voltar</Button></Link>
          </HStack>

        </Stack>
      </Flex>
    </Box>
  );
};
