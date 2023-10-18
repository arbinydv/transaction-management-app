import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Flex,
  HStack,
  Icon,
  Link,
} from "@chakra-ui/react";
import { FiPaperclip } from 'react-icons/fi';

interface TransactionDetailProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTransaction: Transaction | null;
}

function TransactionDetail({ isOpen, onClose, selectedTransaction }: TransactionDetailProps) {
  if (!selectedTransaction) {
    return null;
  }

  function formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Transaction Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justify="space-between" align="center" mb="2">
            <Text>
              <HStack spacing={1}>
                <Icon as={FiPaperclip} />
                {formatDate(selectedTransaction.date)}
              </HStack>
            </Text>
            {selectedTransaction.attachment && (
              <Link href={selectedTransaction.attachment} target="_blank">
                <HStack spacing={1}>
                  <Icon as={FiPaperclip} />
                  View Attachment
                </HStack>
              </Link>
            )}
          </Flex>
          <Text>Amount: {selectedTransaction.amount}</Text>
          <Text>From: {selectedTransaction.sender}</Text>
          <Text>To: {selectedTransaction.receiver}</Text>
          <Text>Payment Method: {selectedTransaction.paymentMethod}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TransactionDetail;

