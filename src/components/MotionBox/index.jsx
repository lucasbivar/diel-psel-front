import { chakra } from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';
import React from 'react';

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
});

export const MotionBox = ({ children, ...rest }) => {
  return (
    <ChakraBox
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -700, opacity: 0 }}
      // @ts-ignore no problem in operation, although type error appears.
      transition={{
        duration: 0.8,
        ease: 'easeInOut',
      }}
      {...rest}
    >
      {children}
    </ChakraBox>
  );
};
