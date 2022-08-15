import React from 'react';
import { Flex, Image, Text } from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import dielLogo from '../../assets/icon.svg';

export const Header = ({ currPage }) => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };
  return (
    <Flex
      id="nav"
      height="60px"
      px={{
        base: '1.5rem',
        xl: '5rem',
        nb: '12rem',
        d: '20rem',
      }}
      align="center"
      justify="space-between"
      backgroundColor="primary"
      position="sticky"
      top="0"
      zIndex="999"
      marginBottom="30px"
    >
      <Image
        onClick={goToHome}
        cursor="pointer"
        src={dielLogo}
        h={{ base: '1rem', sm: '1.2rem', md: '1.8rem' }}
      />
      <Flex>
        <Link to="/">
          <Text
            fontWeight={currPage === 'tasks' ? 'bold' : 'none'}
            color="white"
            textAlign="center"
            p="14px 16px"
            textDecor="none"
            fontSize={{ base: '0.8rem', md: '1rem' }}
          >
            Tarefas
          </Text>
        </Link>
        <Link to="/historico">
          <Text
            fontWeight={currPage === 'historic' ? 'bold' : 'none'}
            color="white"
            textAlign="center"
            p="14px 16px"
            textDecor="none"
            fontSize={{ base: '0.8rem', md: '1rem' }}
          >
            Histórico
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
};
