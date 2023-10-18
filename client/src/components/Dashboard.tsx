import {
  Center,
  Grid,
} from "@chakra-ui/react";
import TransactionDetail from './TransactionDetail';
import DashboardHeader from './DashboardHeader';
import TransactionTable from "./TransactionTable";
import { useState } from "react";

interface Transaction {
  id: number;
  date: string;
  amount: string;
  sender: string;
  receiver: string;
  paymentMethod: string;
  attachment?: string;
}

function BuildDashboard({ data }: { data: Transaction[] }) {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
    setIsModalOpen(false);
  };

  return (
    <Center>
      <Grid templateRows="auto 1fr" gap={4}>
        <DashboardHeader/>
        <TransactionTable data={data} openModal={openModal} />
        <TransactionDetail isOpen={isModalOpen} onClose={closeModal} selectedTransaction={selectedTransaction} />
      </Grid>
    </Center>
  );
}

export default BuildDashboard;
