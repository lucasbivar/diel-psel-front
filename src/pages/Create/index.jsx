/* eslint-disable import/no-cycle */
import {
  Box, Flex, Stack, Input, FormLabel, Textarea, FormControl,
  Button, Select, HStack, Heading, FormErrorMessage, useToast,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { createTask } from '../../api';
import { Header } from '../../components/Header';
import { queryClient } from '../../main';
import { createTaskSchema } from '../../validation/taskSchema';

export const Create = () => {
  const getCurrentDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; // January is 0 so need to add 1 to make it 1!
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }

    today = `${yyyy}-${mm}-${dd}`;
    return today;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createTaskSchema),
  });

  const navigate = useNavigate();

  const {
    error,
    isLoading,
    isSuccess,
    mutateAsync,
  } = useMutation(async (task) => {
    await createTask(task);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todo']);
    },
  });

  const onSubmit = async (data) => {
    await mutateAsync(data);
  };

  const toast = useToast();

  if (isSuccess) {
    const idToastSuccess = 'success';
    if (!toast.isActive(idToastSuccess)) {
      toast({
        id: idToastSuccess,
        title: 'Tarefa criada com sucesso.',
        status: 'success',
        position: 'bottom-right',
        duration: 3000,
        isClosable: true,
      });
    }
    navigate('/');
  }

  if (error) {
    const idToastError = 'error';

    if (!toast.isActive(idToastError)) {
      toast({
        id: idToastError,
        title: 'Erro ao criar tarefa.',
        status: 'error',
        position: 'bottom-right',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (

    <Box min-width="100vw">
      <Header />
      <Flex
        justify="center"
        marginTop="20px"
        marginBottom="20px"
        min-width="100vw"
        minHeight="calc(100vh - 60px)"
      >
        <Stack
          spacing="1rem"
          width={{ base: '75%', lg: '50%' }}
          as="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Heading>NOVA TAREFA</Heading>

          <FormControl isInvalid={errors.title}>
            <FormLabel htmlFor="title">Título:</FormLabel>
            <Input
              type="text"
              focusBorderColor={errors.title ? 'red.500' : 'primary'}
              placeholder="Digite o título da tarefa"
              {...register('title')}
            />
            {errors.title
              && (
              <FormErrorMessage>
                {errors.title.message}
              </FormErrorMessage>
              )}
          </FormControl>
          <FormControl isInvalid={errors.date}>
            <FormLabel htmlFor="date">Data:</FormLabel>
            <Input
              errors={errors.date}
              type="date"
              focusBorderColor={errors.date ? 'red.500' : 'primary'}
              min={getCurrentDate()}
              {...register('date')}
            />
            {errors.date
              && (
              <FormErrorMessage>
                {errors.date.message}
              </FormErrorMessage>
              )}
          </FormControl>

          <FormControl isInvalid={errors.time}>
            <FormLabel htmlFor="time">Horário:</FormLabel>
            <Input
              errors={errors.time}
              min={getCurrentDate()}
              focusBorderColor={errors.time ? 'red.500' : 'primary'}
              type="time"
              {...register('time')}
            />
            {errors.time
              && (
              <FormErrorMessage>
                {errors.time.message}
              </FormErrorMessage>
              )}
          </FormControl>

          <FormControl isInvalid={errors.hour}>
            <FormLabel htmlFor="hour">Duração:</FormLabel>
            <Select
              errors={errors.hour}
              focusBorderColor={errors.hour ? 'red.500' : 'primary'}
              placeholder="Quantidade de Horas"
              {...register('hour')}
            >
              {[...Array(25)].map((x, i) => <option key={i} value={i}>{i}</option>)}
            </Select>
            {errors.hour
              && (
              <FormErrorMessage>
                {errors.hour.message}
              </FormErrorMessage>
              )}
          </FormControl>
          <FormControl isInvalid={errors.minute}>
            <FormLabel htmlFor="hour" />
            <Select
              {...register('minute')}
              errors={errors.minute}
              focusBorderColor={errors.minute ? 'red.500' : 'primary'}
              placeholder="Quantidade de Minutos"
            >
              {[...Array(60)].map((x, i) => <option key={i} value={i}>{i}</option>)}
            </Select>

            {errors.minute
              && (
              <FormErrorMessage>
                {errors.minute.message}
              </FormErrorMessage>
              )}
          </FormControl>

          <FormControl isInvalid={errors.description}>
            <FormLabel htmlFor="description">Descrição:</FormLabel>
            <Textarea
              {...register('description')}
              errors={errors.description}
              minHeight="250px"
              focusBorderColor={errors.description ? 'red.500' : 'primary'}
              placeholder="Descreva a sua tarefa"
            />
            {errors.description
              && (
              <FormErrorMessage>
                {errors.description.message}
              </FormErrorMessage>
              )}
          </FormControl>
          <HStack width="100%">
            <Button
              width="70%"
              type="submit"
              isLoading={isLoading}
              colorScheme="brand"
            >
              Criar Tarefa

            </Button>

            <Button onClick={() => navigate('/')} width="30%" colorScheme="brand">Voltar</Button>
          </HStack>
        </Stack>
      </Flex>
    </Box>

  );
};
