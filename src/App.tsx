import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { theme } from './theme';
import { Check } from 'react-bootstrap-icons';
import { appService } from './app.service';
import { useService } from './useService';

function App() {
  const [state, dispatch] = useService(appService);

  return (
    <ChakraProvider theme={theme}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: 'Submit' });
        }}
      >
        <Flex align="center" direction="column" p="24">
          <Box rounded="md" boxShadow="base" bg="white" p="8" minWidth="xl">
            <Stack spacing="24px">
              <Box>
                <Heading color="primary.800">
                  {state.success ? 'Yeahhhh' : 'Login'}
                </Heading>
                <Text>{state.isLoading ? 'Here we go!' : 'Waiting'}</Text>
              </Box>
              <Stack spacing="8px">
                <FormControl>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Input
                    id="email"
                    name="email"
                    colorScheme="primary"
                    value={state.email}
                    onChange={(e) =>
                      dispatch({
                        type: 'FieldValueChange',
                        fieldName: 'email',
                        value: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    colorScheme="secondary"
                    value={state.password}
                    onChange={(e) =>
                      dispatch({
                        type: 'FieldValueChange',
                        fieldName: 'password',
                        value: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </Stack>
              <Button
                type="submit"
                colorScheme="primary"
                leftIcon={<Check size={24} />}
              >
                Login
              </Button>
            </Stack>
          </Box>
        </Flex>
      </form>
    </ChakraProvider>
  );
}

export default App;
