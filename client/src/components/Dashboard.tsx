import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Box,
  Flex,
  Icon,
  Link,
} from "@chakra-ui/react";
import { FaUser, FaArrowRight, FaArrowLeft, FaMoney } from 'react-icons/fa';
import { FaPaperclip } from 'react-icons/fa';

interface Transaction {
  id: number;
  date: string;
  amount: number;
  sender: string;
  receiver: string;
  paymentMethod: string;
  attachment?: string; // Add an attachment property
}

function formatDate(inputDate: string) {
  const date = new Date(inputDate);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function Dashboard({ data }: { data: Transaction[] }) {
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

  if (!data || data.length === 0) {
    return <div>No data available.</div>;
  }

  // Rename columns
  const columnNames = {
    sender: 'From',
    receiver: 'To',
    paymentMethod: 'Payment Method',
  };

  // Filter out specific columns to exclude
  const excludedColumns = ['CreatedAt', 'UpdatedAt', 'DeletedAt'];
  const keys = Object.keys(data[0]).filter((key) => !excludedColumns.includes(key));

  return (
    <div>
      <Table variant="striped" colorScheme="white">
        <Thead>
          <Tr>
            {keys.map((key) => (
              <Th key={key}>
                {columnNames[key] || key}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index} onClick={() => openModal(item)} style={{ cursor: 'pointer' }}>
              {keys.map((key) => (
                <Td key={key}>
                  {key === 'date' ? formatDate(item[key]) : item[key]}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
      {selectedTransaction && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Transaction Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex justify="space-between" align="center" mb="2">
                <Text>Date: {formatDate(selectedTransaction.date)}</Text>
                {selectedTransaction.attachment && (
                  <Link href={selectedTransaction.attachment} target="_blank">
                    <Icon as={FaPaperclip} mr="2" />
                    View Attachment
                  </Link>
                )}
              </Flex>
              <Text>Amount: {selectedTransaction.amount}</Text>
              <Text>From: {selectedTransaction.sender}</Text>
              <Text>To: {selectedTransaction.receiver}</Text>
              <Text>Payment Method: {selectedTransaction.paymentMethod}</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={closeModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

export default Dashboard;
