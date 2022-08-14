/* eslint-disable import/no-cycle */
import {
  Box, Flex, Heading, Input, InputGroup, InputLeftElement, Select, Stack,
} from '@chakra-ui/react';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Header } from '../../components/Header';
import './style.css';
import { Task } from '../../components/Task';
import { MotionBox } from '../../components/MotionBox';
import { getTasks } from '../../api';

export const Home = () => {
  const { data, isLoading } = useQuery(['todo'], async () => {
    const { tasks } = await getTasks();

    return tasks;
  }, {
    staleTime: 5000,
  });

  return (
    <Box min-width="100vw">
      <Header currPage="tasks" />
      <Flex justify="center" min-width="100vw" minHeight="calc(100vh - 60px)">

        <Stack spacing="16px" paddingBottom="30px">
          <Flex
            direction="row"
            justify="space-between"
            width={{
              base: '17rem', md: '23rem', lg: '30rem', nb: '40rem',
            }}
            align="center"
          >
            <InputGroup width="70%">
              <InputLeftElement
                pointerEvents="none"
              >
                <SearchIcon style={{ color: '#181842' }} />
              </InputLeftElement>
              <Input borderColor="primary" border="2px" focusBorderColor="primary" type="tel" placeholder="Tarefa" />
            </InputGroup>
            <Select width="28%" color="white" focusBorderColor="primary" borderColor="primary" bg="primary">
              <option style={{ color: '#181842' }} value="filtro" selected>Filtro</option>
              <option style={{ color: '#181842' }} value="dia">Dia</option>
              <option style={{ color: '#181842' }} value="semana">Semana</option>
              <option style={{ color: '#181842' }} value="mes">Mês</option>
            </Select>
          </Flex>
          {isLoading ? <Heading>Loading</Heading>
            : data?.filter(({
              status,
            }) => status !== 'Deleted').map(({
              title, description, _id, date, time, durationToString, status,
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
                />
              );
            })}

        </Stack>

        <MotionBox>
          <Link to="/criar" id="addBtn">
            <AddIcon id="addIcon" />
          </Link>
        </MotionBox>
      </Flex>
    </Box>
  );
};
