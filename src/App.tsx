import React from 'react';
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
import { useFormControls } from './useFormControls';

function App() {
  const [state, dispatch] = useService(appService);
  const formControl = useFormControls(state.form, dispatch);

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
                  <Input colorScheme="primary" {...formControl('email')} />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    type="password"
                    colorScheme="secondary"
                    {...formControl('password')}
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
