/* eslint-disable no-return-await */
import {
  Checkbox,
  Flex,
  Heading,
  IconButton,
  Text,
  Box,
  useQuery,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AlarmIcon from '@mui/icons-material/Alarm';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ReplayIcon from '@mui/icons-material/Replay';
import { useNavigate } from 'react-router-dom';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { MotionBox } from '../MotionBox';
import { deleteTask, editTask, editTaskStatus, getTaskById } from '../../api';
import { queryClient } from '../../main';

export const Task = ({
  title,
  description,
  date,
  deleted,
  time,
  duration,
  status,
  id,
}) => {
  const navigate = useNavigate();
  const goToEdit = () => {
    navigate(`/editar/${id}`);
  };

  const handlePrefetchTask = async (taskID) => {
    return await queryClient.prefetchQuery(
      ['todo', { id: taskID }],
      async () => {
        const { tasks } = await getTaskById(taskID);
        return tasks;
      },
      {
        staleTime: 1000 * 60 * 10, // 10 minutes
      },
    );
  };
  const goToDetails = () => {
    navigate(`/detalhes/${id}`);
  };

  const toast = useToast();
  const [done, setDone] = useState(status === 'Done');
  const handleStatus = async () => {
    await editTaskStatus(id, { status: status === 'Done' ? 'ToDo' : 'Done' });
    queryClient.invalidateQueries('todo');
    if (!done) {
      const idToastDone = 'done';
      if (!toast.isActive(idToastDone)) {
        toast({
          id: idToastDone,
          title: 'Tarefa marcada como realizada.',
          status: 'success',
          position: 'bottom-right',
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      const idToastToDo = 'ToDo';
      if (!toast.isActive(idToastToDo)) {
        toast({
          id: idToastToDo,
          title: 'Tarefa marcada como pendente.',
          status: 'success',
          position: 'bottom-right',
          duration: 3000,
          isClosable: true,
        });
      }
    }

    setDone(!done);
  };

  const handleDelete = async () => {
    await deleteTask(id);
    queryClient.invalidateQueries('todo');

    const idToastSuccess = 'success';
    if (!toast.isActive(idToastSuccess)) {
      toast({
        id: idToastSuccess,
        title: 'Tarefa deletada com sucesso.',
        status: 'success',
        position: 'bottom-right',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRecovery = async () => {
    await editTaskStatus(id, { deleted: false });

    const idToastSuccess = 'success';
    if (!toast.isActive(idToastSuccess)) {
      toast({
        id: idToastSuccess,
        title: 'Tarefa recuperada com sucesso.',
        status: 'success',
        position: 'bottom-right',
        duration: 3000,
        isClosable: true,
      });
    }
    queryClient.invalidateQueries('todo');
    navigate('/');
  };

  const getBorderColor = () => {
    if (deleted) {
      return '18px solid #C90000';
    }
    if (done) {
      return '18px solid green';
    }
    return '18px solid #181842';
  };
  return (
    <MotionBox>
      <Flex
        cursor="pointer"
        py={{
          base: '4rem',
          md: '4rem',
          lg: '1rem',
          nb: '1rem',
        }}
        height={{
          base: '140px',
          md: '100px',
          lg: '80px',
          nb: '80px',
        }}
        width={{
          base: '17rem',
          md: '23rem',
          lg: '30rem',
          nb: '40rem',
        }}
        align="center"
        justify="space-between"
        px="2rem"
        borderRadius="7px"
        borderLeft={getBorderColor()}
        boxShadow="2px 0px 8px 2px rgba(0,0,0,0.16)"
        _hover={{ backgroundColor: '#f5f5f5' }}
        onClick={!deleted ? goToDetails : null}
        onMouseEnter={() => (!deleted ? handlePrefetchTask(id) : null)}
      >
        <Flex width="70%" justify="space-between">
          <Flex direction="column" width="100%">
            <Heading
              as="h2"
              marginBottom="0.2rem"
              fontSize={{
                base: '0.9rem',
                lg: '1rem',
                nb: '1rem',
              }}
              textDecoration={done && !deleted ? 'line-through' : null}
            >
              {title}
            </Heading>
            <Flex
              direction={{ base: 'column', lg: 'row' }}
              justify="space-between"
              width="100%"
            >
              <Flex align="center">
                <CalendarMonthIcon style={{ width: '1.3rem' }} />
                <Text
                  marginLeft="0.2rem"
                  fontSize={{ base: '0.9rem', lg: '1rem' }}
                >
                  {date}
                </Text>
              </Flex>
              <Flex align="center">
                <ScheduleIcon style={{ width: '1.3rem' }} />
                <Text
                  marginLeft="0.2rem"
                  fontSize={{ base: '0.9rem', lg: '1rem' }}
                >
                  {time}
                </Text>
              </Flex>
              <Flex align="center">
                <AlarmIcon style={{ width: '1.3rem' }} />
                <Text
                  marginLeft="0.2rem"
                  fontSize={{ base: '0.9rem', lg: '1rem' }}
                >
                  {duration}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          justify="space-between"
          align="center"
          direction={{ base: 'column', lg: 'row' }}
          width={deleted ? '5%' : '20%'}
        >
          {deleted ? (
            <IconButton
              _hover={{ backgroundColor: 'transparent' }}
              onClick={handleRecovery}
              size="sm"
              bgColor="transparent"
              icon={<ReplayIcon style={{ color: '#181842' }} />}
            />
          ) : (
            <>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatus();
                }}
                _hover={{ backgroundColor: 'transparent' }}
                size="sm"
                width="1rem"
                bgColor="transparent"
                icon={
                  done ? (
                    <CheckBoxIcon style={{ color: 'green' }} />
                  ) : (
                    <CheckBoxOutlineBlankIcon style={{ color: '#181842' }} />
                  )
                }
              />
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  goToEdit();
                }}
                _hover={{ backgroundColor: 'transparent' }}
                size="sm"
                width="1rem"
                bgColor="transparent"
                icon={<EditIcon style={{ color: '#181842' }} />}
              />
              <IconButton
                _hover={{ backgroundColor: 'transparent' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                size="sm"
                bgColor="transparent"
                icon={<DeleteIcon style={{ color: '#181842' }} />}
              />
            </>
          )}
        </Flex>
      </Flex>
    </MotionBox>
  );
};
