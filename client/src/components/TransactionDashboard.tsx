import { Box, Spinner, Grid, GridItem, ChakraProvider } from '@chakra-ui/react';
import useSWR from 'swr';
import theme from './theme';
import Sidebar from './SideBar';
import Dashboard from './Dashboard';

export const ENDPOINT = 'http://localhost:4000';

interface Transaction {
  id: number;
  date: string;
  amount: number;
}

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((response) => response.json()).then((data) => data.data);

function TransactionTable() {
  const { data, error } = useSWR<Transaction[]>('transactions', fetcher);

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Grid
          templateAreas={`"nav main"`}
          templateColumns='1fr 3fr'>
          <Sidebar />
          <GridItem bg='white'>
            {data ? <Dashboard data={data} /> : <Spinner />}
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default TransactionTable;
