import { Button, Flex, Heading, Image, Link, Stack } from '@chakra-ui/react';
import React from 'react';
import errorImage from '../../assets/error_image.png';

export const Error = (props) => {
  return (
    <Flex justify="center" align="center" height="100vh" width="100%">
      <Stack spacing="1rem" align="center">
        <Image width="15rem" src={errorImage} alt="imagem de erro 404" />
        <Heading fontSize={{ base: '1rem', lg: '1.5rem' }} color="primary">
          Erro 404 - Página não encontrada!
        </Heading>
        <Link href="/">
          <Button colorScheme="brand"> Ir para página principal</Button>
        </Link>
      </Stack>
    </Flex>
  );
};
