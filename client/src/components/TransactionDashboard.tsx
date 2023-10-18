import {Spinner, Grid, GridItem, ChakraProvider } from '@chakra-ui/react';
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

function TransactionDashboard() {
  const { data, error } = useSWR<Transaction[]>('transactions', fetcher);

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <ChakraProvider theme={theme}>
      <Grid templateColumns="250px 1fr" minH="100vh">
        <GridItem>
          <Sidebar />
        </GridItem>
        <GridItem  bg="white">
          {data ? <Dashboard data={data} /> : <Spinner />}
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default TransactionDashboard;
