import {
  Box,
  Flex,
  Stack,
  Input,
  FormLabel,
  Textarea,
  FormControl,
  Button,
  Select,
  HStack,
  Heading,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { editTask, getTaskById } from '../../api';
import { Header } from '../../components/Header';
import { queryClient } from '../../main';
import { createTaskSchema } from '../../validation/taskSchema';
import { formatDate, formatTime } from '../../utils';

export const Edit = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();

  const { data: previousData, error: reqError } = useQuery(
    ['edit-todo', { id }],
    async () => {
      const { tasks } = await getTaskById(id);

      return tasks;
    },
    {
      staleTime: 5000,
    },
  );

  if (reqError) navigate('/error');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(createTaskSchema),
  });

  useEffect(() => {
    if (previousData) {
      setValue('title', previousData.title);
      setValue('description', previousData.description);
      setValue('minute', previousData.duration % 60);
      setValue('hour', Math.floor(previousData.duration / 60));
      const [day, month, year] = formatDate(previousData.dateTime).split('-');
      setValue('date', `${year}-${month}-${day}`);
      setValue('time', `${formatTime(previousData.dateTime)}:00`);
    }
  }, [previousData]);

  const { error, isLoading, isSuccess, mutateAsync } = useMutation(
    async (task) => {
      await editTask(id, task);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todo']);
      },
    },
  );

  if (isSuccess) {
    const idToastSuccess = 'success';
    if (!toast.isActive(idToastSuccess)) {
      toast({
        id: idToastSuccess,
        title: 'Tarefa editada com sucesso.',
        status: 'success',
        position: 'bottom-right',
        duration: 3000,
        isClosable: true,
      });
    }
    navigate(`/detalhes/${id}`);
  }

  if (error) {
    const idToastError = 'error';

    if (!toast.isActive(idToastError)) {
      toast({
        id: idToastError,
        title: 'Erro ao salvar edição.',
        status: 'error',
        position: 'bottom-right',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const onSubmit = async (data) => {
    await mutateAsync(data);
  };
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
          <Heading>EDITAR TAREFA</Heading>

          <FormControl isInvalid={errors.title}>
            <FormLabel htmlFor="title">Título:</FormLabel>
            <Input
              type="text"
              focusBorderColor={errors.title ? 'red.500' : 'primary'}
              placeholder="Digite o título da tarefa"
              {...register('title')}
            />
            {errors.title && (
              <FormErrorMessage>{errors.title.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errors.date}>
            <FormLabel htmlFor="date">Data:</FormLabel>
            <Input
              errors={errors.date}
              type="date"
              focusBorderColor={errors.date ? 'red.500' : 'primary'}
              {...register('date')}
            />
            {errors.date && (
              <FormErrorMessage>{errors.date.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={errors.time}>
            <FormLabel htmlFor="time">Horário:</FormLabel>
            <Input
              errors={errors.time}
              focusBorderColor={errors.time ? 'red.500' : 'primary'}
              type="time"
              {...register('time')}
            />
            {errors.time && (
              <FormErrorMessage>{errors.time.message}</FormErrorMessage>
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
              {[...Array(25)].map((x, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </Select>
            {errors.hour && (
              <FormErrorMessage>{errors.hour.message}</FormErrorMessage>
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
              {[...Array(60)].map((x, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </Select>

            {errors.minute && (
              <FormErrorMessage>{errors.minute.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={errors.description}>
            <FormLabel htmlFor="description">Descrição:</FormLabel>
            <Textarea
              minHeight="250px"
              {...register('description')}
              errors={errors.description}
              focusBorderColor={errors.description ? 'red.500' : 'primary'}
              placeholder="Descreva a sua tarefa"
            />
            {errors.description && (
              <FormErrorMessage>{errors.description.message}</FormErrorMessage>
            )}
          </FormControl>
          <HStack width="100%">
            <Button
              width="70%"
              type="submit"
              isLoading={isLoading}
              colorScheme="brand"
            >
              Salvar
            </Button>

            <Button
              onClick={() => navigate(-1)}
              width="30%"
              colorScheme="brand"
            >
              Voltar
            </Button>
          </HStack>
        </Stack>
      </Flex>
    </Box>
  );
};
