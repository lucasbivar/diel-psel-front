import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
} from '@chakra-ui/react';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Header } from '../../components/Header';
import './style.css';
import { Task } from '../../components/Task';
import { MotionBox } from '../../components/MotionBox';
import { getTasks } from '../../api';
import { formatDate, formatTime } from '../../utils';

export const Home = () => {
  const [searchBarValue, setSearchBarValue] = useState('');
  const [selectValue, setSelectValue] = useState('filter');
  const [extraFilterValue, setExtraFilterValue] = useState('');

  const customFilter = () => {
    console.log(selectValue);
    console.log(extraFilterValue);
    return (todos) =>
      todos
        .filter((todo) =>
          todo.title
            .toLowerCase()
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .includes(
              searchBarValue
                .toLowerCase()
                .normalize('NFD')
                .replace(/\p{Diacritic}/gu, ''),
            ),
        )
        .sort((a, b) => {
          const keyA = new Date(a.dateTime);
          const keyB = new Date(b.dateTime);
          if (keyA < keyB) return 1;
          if (keyA > keyB) return -1;
          return 0;
        });
  };

  const { data, isLoading } = useQuery(
    ['todo'],
    async () => {
      const { tasks } = await getTasks();

      return tasks;
    },
    {
      staleTime: 5000,
      select: customFilter(),
    },
  );

  return (
    <Box min-width="100vw">
      <Header currPage="tasks" />
      <Flex justify="center" min-width="100vw" minHeight="calc(100vh - 60px)">
        <Stack spacing="16px" paddingBottom="30px">
          <Flex
            direction="row"
            justify="space-between"
            width={{
              base: '17rem',
              md: '23rem',
              lg: '30rem',
              nb: '40rem',
            }}
            align="center"
          >
            <InputGroup width="70%">
              <InputLeftElement pointerEvents="none">
                <SearchIcon style={{ color: '#181842' }} />
              </InputLeftElement>
              <Input
                value={searchBarValue}
                onChange={(e) => setSearchBarValue(e.target.value)}
                borderColor="primary"
                border="2px"
                focusBorderColor="primary"
                placeholder="Tarefa"
              />
            </InputGroup>
            <Select
              width="28%"
              fontSize={{ base: '0.7rem', md: '1rem' }}
              color="white"
              focusBorderColor="primary"
              borderColor="primary"
              bg="primary"
              onChange={(e) => setSelectValue(e.target.value)}
            >
              <option style={{ color: '#181842' }} value="filter" selected>
                Filtro
              </option>
              <option style={{ color: '#181842' }} value="date">
                Dia
              </option>
              <option style={{ color: '#181842' }} value="week">
                Semana
              </option>
              <option style={{ color: '#181842' }} value="month">
                Mês
              </option>
            </Select>
          </Flex>
          {selectValue !== 'filter' ? (
            <InputGroup width="100%">
              <Input
                borderColor="primary"
                border="2px"
                focusBorderColor="primary"
                placeholder="A"
                type={selectValue}
                onChange={(e) => setExtraFilterValue(e.target.value)}
              />
            </InputGroup>
          ) : null}
          {data?.filter(({ deleted }) => !deleted).length === 0 ? (
            <Flex width="100%" justify="center">
              <Heading fontSize={{ base: '0.9rem', md: '1.2rem' }}>
                Ainda Não Foi Criada Nenhuma Tarefa
              </Heading>
            </Flex>
          ) : null}

          {data
            ?.filter(({ deleted }) => !deleted)
            .map(
              ({
                title,
                description,
                _id,
                dateTime,
                deleted,
                durationToString,
                status,
              }) => {
                return (
                  <Task
                    title={title}
                    description={description}
                    date={formatDate(dateTime)}
                    time={formatTime(dateTime)}
                    duration={durationToString}
                    id={_id}
                    status={status}
                    key={_id}
                    deleted={deleted}
                    isSearching={searchBarValue === '' ? false : true}
                  />
                );
              },
            )}
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
