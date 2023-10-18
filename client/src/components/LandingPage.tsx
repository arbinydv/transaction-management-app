import {
  Box,
  ChakraProvider,
  Grid,
  GridItem,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Icon,
  List,
  ListItem,
  Center,
  Flex,
} from "@chakra-ui/react";
import { FaSmile, FaFileExport, FaFilter, FaTable, FaSearch } from "react-icons/fa";  
import theme from "./theme";
import SideBar from "./SideBar";

function Sidebar() {
  return <SideBar />;
}

function MainContent() {
  return (
    <Flex
    align="center"  
    justify="center"
    height="80%"
    mx={20}
  >
    <Card width="100%" height="80%%" p={30} boxShadow="lg">
      <CardHeader bg="green.500" color="white">
        <Heading size="md">Transaction Application</Heading>
      </CardHeader>
      <CardBody>
        <Box alignContent="center">
          <Icon as={FaSmile} boxSize={16} color="green.500" />
          <Text fontSize="lg" fontWeight="bold" my={3}>
            Hello there,
          </Text>
          <Text fontSize="md">
            View a summary of all your transactions at a centralized Dashboard.
          </Text>
          <List mt={4}>
            <ListItem>
              <Icon as={FaTable} color="green.500" mr={2} />
              Access your transaction data easily.
            </ListItem>
            <ListItem>
              <Icon as={FaFilter} color="green.500" mr={2} />
              Filter the Data based on your Business need.
            </ListItem>
            <ListItem>
              <Icon as={FaFileExport} color="green.500" mr={2} />
              Get insights by exporting it to other tools.
            </ListItem>
          </List>
        </Box>
      </CardBody>
    </Card>
    </Flex>
  );
}

function LandingPage() {
  return (
    <ChakraProvider theme={theme}>
      <Grid templateColumns="250px 1fr" height="100vh">
        <GridItem>
          <Sidebar />
        </GridItem>
        <GridItem>
          <MainContent />
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default LandingPage;
