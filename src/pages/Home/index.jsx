import {
  Box, Button, Flex, Heading, Input, InputGroup, InputLeftElement, Select, Stack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Header } from '../../components/Header';
import './style.css';
import { Task } from '../../components/Task';
import { MotionBox } from '../../components/MotionBox';

export const Home = () => {
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
          {[...Array(61)].map((x, i) => (
            <Task
              title="Lorem Ipsum Lorem Ipsum..."
              description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus, aliquam! Facilis quia beatae quisquam officiis minima ab voluptatum, itaque obcaecati."
              date="10/08/2022"
              time="13:04"
              duration="1h 23m"
              id={i}
            />
          ))}

        </Stack>

        <MotionBox>
          <a href="criar" id="addBtn">
            <AddIcon id="addIcon" />
          </a>
        </MotionBox>
      </Flex>
    </Box>
  );
};
