import React from 'react';
import {
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Icon,
  Text,
  Avatar,
  Table,
} from "@chakra-ui/react";
import { FiArrowLeftCircle, FiCalendar, FiCreditCard, FiDollarSign, FiSend } from 'react-icons/fi';

interface Transaction {
  id: number;
  date: string;
  amount: number;
  sender: string;
  receiver: string;
  paymentMethod: string;
  attachment?: string;
}

interface TransactionTableProps {
  data: Transaction[];
  openModal: (transaction: Transaction) => void;
}

function TransactionTable({ data, openModal }: TransactionTableProps) {
  // Define columnNames and other functions needed for the table
  const columnNames: {
    [key: string]: { label: string; icon: React.ReactElement };
  } = {
    date: {label: 'Date(NPT)', icon: FiCalendar},
    sender: { label: 'From', icon: FiSend },
    receiver: { label: 'To', icon: FiSend},
    paymentMethod: { label: 'Payment Method', icon: FiDollarSign },
    amount: { label:'Amount', icon: FiDollarSign },
    account: { label:'Account', icon: FiCreditCard },
  };

  // Define a type for the paymentMethodIcons object
  const paymentMethodIcons: PaymentMethodIcons = {
    Transfer: <FiArrowLeftCircle />,
    Card: <FiCreditCard/>,
    Paypal: <FiSend/>,
  };

  type PaymentMethodIcons = {
    [key: string]: React.ReactElement;
  };

  const excludedColumns = ['CreatedAt', 'UpdatedAt', 'DeletedAt','ID'];
  const keys = Object.keys(data[0]).filter((key) => !excludedColumns.includes(key));
  const avatarColors = ["teal.500", "green.500", "blue.500", "purple.500", "orange.500"];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * avatarColors.length);
    return avatarColors[randomIndex];
  };

  function formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  return (
    <Table marginLeft="10px" mx="8">
      <Thead>
        <Tr>
          {keys.map((key) => (
            <Th key={key}>
              <HStack spacing={1}>
                {columnNames[key]?.icon && columnNames[key]?.label && (
                  <>
                    <Icon as={columnNames[key].icon as unknown as React.ComponentType} />
                    <Text>{columnNames[key].label}</Text>
                  </>
                )}
                {columnNames[key]?.label || key}
              </HStack>
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item, index) => (
          <Tr key={index} onClick={() => openModal(item)} style={{ cursor: 'pointer' }}>
            {keys.map((key) => (
            <Td key={key}>
            {key === 'date' ? formatDate(item[key]) : key === 'sender' ? (
              <HStack spacing={1}>
                <Avatar size="sm" bg={getRandomColor()} name={item[key]} />
                <Text>{item[key]}</Text>
              </HStack>
            ) : key === 'paymentMethod' ? (
              <HStack spacing={1}>
                {paymentMethodIcons[item[key]] || item[key]}
                <Text>{item[key]}</Text>
              </HStack>
            ) : (
              item[key]
            )}
          </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default TransactionTable;
