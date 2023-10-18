import {
  Box,
  Text,
  Flex,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FiFilter, FiUpload } from 'react-icons/fi';
import { useToast } from '@chakra-ui/react';

function DashboardHeader() {
  const toast = useToast();

  return (
    <Box justifyContent="space-between" alignItems="center" marginBottom="15px" paddingTop="20px">
      <Flex h="19" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Transactions
        </Text>
      </Flex>
      <HStack spacing={4} fontSize="10px" paddingTop={10} mx="8">
        <Flex>
          <Menu>
            <MenuButton as={Button} rightIcon={<FiFilter />} variant="outline">
              Add Filter
            </MenuButton>
            <MenuList>
              <MenuItem>Date</MenuItem>
              <MenuItem>Payment Type</MenuItem>
              <MenuItem>Account</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Flex ml="auto">
          <Menu>
            <MenuButton 
              as={Button} 
              rightIcon={<FiUpload />} 
              variant="outline"
              onClick={() =>{
                toast({
                  title: "Exporting data...",
                  description: "Non-functional component.",
                  status: "info",
                  duration: 3000,
                  isClosable: true,
                  position:'top-right'
                });
              }}
            >
              Export All
            </MenuButton>
          </Menu>
        </Flex>
      </HStack>
    </Box>
  );
}

export default DashboardHeader;
