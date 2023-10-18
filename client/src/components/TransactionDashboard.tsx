import { Grid, GridItem, ChakraProvider } from '@chakra-ui/react';
import useSWR from 'swr';
import theme from './theme';
import Sidebar from './SideBar';
import { useState } from 'react';
import Pagination from './Pagination';
import BuildDashboard from './Dashboard';

export const ENDPOINT = 'http://localhost:4000';

interface Transaction {
  id: number;
  date: string;
  amount: string;
  sender:string;
  receiver: string;
  paymentMethod: string;

}

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`)
    .then((response) => response.json())
    .then((data) => data.data);

function TransactionDashboard() {

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(7);

  const { data, error } = useSWR<Transaction[]>('transactions', fetcher);

  if (error) {
    return <div>Error loading data</div>;
  }

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = (data ?? []).slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil((data?.length ?? 0) / recordsPerPage);
  
  return (
    <ChakraProvider theme={theme}>
      <Grid templateColumns="250px 1fr" minH="100vh">
        <GridItem>
          <Sidebar />
        </GridItem>
        <GridItem bg="white">
          <BuildDashboard data={currentRecords} />
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default TransactionDashboard;
