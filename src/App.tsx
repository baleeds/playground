import React from 'react';
import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { theme } from './theme';
import { Check } from 'react-bootstrap-icons';
import * as Yup from 'yup';
import { Form, Formik, FormikConfig } from 'formik';
import { InputControl } from 'formik-chakra-ui';

interface Values {
  email: string;
  password: string;
}

const initialValues: Values = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(2),
});

function App() {
  const onSubmit: FormikConfig<Values>['onSubmit'] = (values) => {
    console.log(values);
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex align="center" direction="column" p="24">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, values, errors }) => (
            <Box
              as={Form}
              rounded="md"
              boxShadow="base"
              bg="white"
              p="8"
              minWidth="xl"
            >
              <Stack spacing="24px">
                <Box>
                  <Heading color="primary.800">This is a header</Heading>
                  <Text>Here we go!</Text>
                </Box>
                <Stack spacing="8px">
                  <InputControl label="Email" name="email" />
                  <InputControl label="Password" name="password" />
                  {/* <FormControl>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <Input id="email" name="email" colorScheme="primary" />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      colorScheme="secondary"
                    />
                  </FormControl> */}
                </Stack>
                <Button colorScheme="primary" leftIcon={<Check size={24} />}>
                  Login
                </Button>
              </Stack>
            </Box>
          )}
        </Formik>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
