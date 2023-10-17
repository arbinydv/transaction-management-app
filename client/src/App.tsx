import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from './components/theme'
import TransactionTable from './components/TransactionDashboard'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box p={4}>
       <TransactionTable/>
      </Box>
    </ChakraProvider>
  );
}

export default App;
