import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Icon,
  Input,
  Stack,
  Flex,
} from "@chakra-ui/react";
import {
  GoCircle,
  GoLocation,
  GoPaperclip,
  GoPlus,
} from "react-icons/go";

interface TransactionDetailProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTransaction: Transaction | null;
}

function TransactionDetail({
  isOpen,
  onClose,
  selectedTransaction,
}: TransactionDetailProps) {
  if (!selectedTransaction) {
    return null;
  }

  function formatDateTime(inputDate) {
    const date = new Date(inputDate);

    // Format the date (e.g., "Oct 10")
    const dateOptions = { month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', dateOptions);

    // Format the time (e.g., "04:35 PM")
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime =
      (hours % 12 || 12) +
      ':' +
      (minutes < 10 ? '0' : '') +
      minutes +
      ' ' +
      ampm;
    return `${formattedDate}, ${formattedTime}`;
  }

  const amountStyle = {
    fontSize: "40px",
    fontWeight: "bold",
    fontFamily: "monospace",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontFamily="monospace" fontSize="16px" fontWeight="light">
          {selectedTransaction.paymentMethod}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <Flex align="center" alignItems="center">
              <Text style={amountStyle}>{selectedTransaction.amount}</Text>
            </Flex>
            <Text fontWeight="bold" fontSize="lg" fontFamily="monospace">
              <Icon as={GoCircle} boxSize={4} color="gray.500" mr={2} fontSize="lg" />
              From {selectedTransaction.sender}
            </Text>
            <Flex direction="column" mx="6">
              <span>{selectedTransaction.paymentMethod}</span>
              <span>{formatDateTime(selectedTransaction.date)}</span>
            </Flex>
            <Text fontWeight="bold" fontSize="lg" fontFamily="monospace">
              <Icon as={GoLocation} boxSize={4} color="blue.500" mr={2} fontSize="lg" />
              To {selectedTransaction.receiver}
            </Text>
            <Flex direction="column" mx="6">
              <span>{selectedTransaction.account}</span>
              <span>{formatDateTime(selectedTransaction.date)}</span>
            </Flex>
            <Text fontFamily="monospace" fontSize="16px">
              Notes
            </Text>
            <Input
              placeholder="Add a note."
              value={selectedTransaction.notes}
              htmlSize={50} width='100' height='100'
            />
            <Flex alignItems="center">
              <Icon as={GoPlus} boxSize={7} mr={2} />Add an attachment
            </Flex>
            <Text fontFamily="monospace" fontSize="16px">
              Bank description
            </Text>
            <Text fontWeight="bold">{selectedTransaction.account}</Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Icon as={GoPaperclip} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TransactionDetail;
