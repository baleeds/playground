import { extendTheme } from '@chakra-ui/react';

const colors = {
  primary: {
    50: '#fae5ff',
    100: '#e5b7fd',
    200: '#d288f7',
    300: '#be59f3',
    400: '#ac2bee',
    500: '#9211d4',
    600: '#720ba6',
    700: '#510778',
    800: '#32034a',
    900: '#13001d',
  },
  secondary: {
    50: '#e1f2ff',
    100: '#b4d6fe',
    200: '#87bbf8',
    300: '#59a0f2',
    400: '#2c85ec',
    500: '#136bd3',
    600: '#0853a5',
    700: '#013b77',
    800: '#00244a',
    900: '#000d1e',
  },
};

export const theme = extendTheme({ colors });
