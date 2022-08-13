import {
  Box, Flex, Stack, Input, FormLabel, Textarea, FormControl, Button, Select, HStack, Link, Heading,
} from '@chakra-ui/react';
import React from 'react';
import { Header } from '../../components/Header';

export const Edit = () => {
  return (

    <Box min-width="100vw">
      <Header />
      <Flex justify="center" marginTop="20px" marginBottom="20px" min-width="100vw" minHeight="calc(100vh - 60px)">
        <Stack spacing="1rem" width={{ base: '75%', lg: '50%' }}>
          <Heading>EDITAR TAREFA</Heading>

          <FormControl isRequired>
            <FormLabel>Título:</FormLabel>
            <Input focusBorderColor="primary" placeholder="Digite o título da tarefa" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Data:</FormLabel>
            <Input focusBorderColor="primary" type="date" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Horário:</FormLabel>
            <Input focusBorderColor="primary" type="time" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Duração:</FormLabel>
            <Stack>
              <Select focusBorderColor="primary" placeholder="Quantidade de Horas">
                {[...Array(25)].map((x, i) => <option value={i}>{i}</option>)}

              </Select>
              <Select focusBorderColor="primary" placeholder="Quantidade de Minutos">
                {[...Array(61)].map((x, i) => <option value={i}>{i}</option>)}
              </Select>
            </Stack>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Descrição:</FormLabel>
            <Textarea focusBorderColor="primary" placeholder="Descreva a sua tarefa" />
          </FormControl>
          <HStack width="100%">
            <Button width="70%" colorScheme="brand">Salvar</Button>

            <Link href="/" width="30%"><Button width="100%" colorScheme="brand">Voltar</Button></Link>
          </HStack>
        </Stack>
      </Flex>
    </Box>

  );
};
