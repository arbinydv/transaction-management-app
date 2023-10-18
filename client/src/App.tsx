import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import theme from './components/theme';
import LandingPage from './components/LandingPage';
import TransactionDashboard from './components/TransactionDashboard';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<TransactionDashboard />} />
      </Routes>
    </ChakraProvider>
  );
}
export default App;
