import React from 'react';
import { BiSolidBank } from "react-icons/bi";
import { FaDollarSign } from 'react-icons/fa';
import {
  FiChevronDown,
  FiChevronUp,
  FiHome,
  FiList,
  FiRepeat,
  FiCreditCard,
  FiTrendingUp,
} from 'react-icons/fi';
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { useNavigate } from 'react-router-dom';

interface LinkItemProps {
  name: string;
  icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome },
  { name: 'Transactions', icon: FiList },
  { name: 'Payments', icon: FiRepeat },
  { name: 'Cards', icon: FiCreditCard },
  { name: 'Capital', icon: FiTrendingUp },
  { name: 'Accounts', icon: BiSolidBank },
];

export default function SideBar() {
  const { isOpen, onClose } = useDisclosure();

  return (
    <Box 
    minH="10vh" 
    position="fixed"
    bg={useColorModeValue('gray.100', 'gray.900')}
    >
      <SidebarContent isOpen={isOpen} onClose={onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} size="full">
        <DrawerContent>
          <SidebarContent isOpen={isOpen} onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      {...rest}
    >
      <Flex h="17" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Box overflowY="auto" maxH="calc(100vh - 60px)">
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} name={link.name} />
        ))}
      </Box>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  name: string;
}

const NavItem = ({ icon, name, ...rest }: NavItemProps) => {
  const [isAccordionOpen, setAccordionOpen] = React.useState(true);
  const subItems = getSubItems(name);
  const navigate = useNavigate();

  function getSubItems(linkName: string) {
    switch (linkName) {
      case 'Payments':
        return [
          { name: 'Transfer' },
          { name: 'Intl Wire' },
          { name: 'Paypal' },
        ];
      case 'Accounts':
        return [
          { name: 'Credit', amount: '0.00' },
          { name: 'Treasury', amount: '200,000.00' },
          { name: 'Ops / Payroll', amount: '2,023,267.12' },
          { name: 'AP', amount: '226,767.82' },
          { name: 'AR', amount: '0.00' },
          { name: 'Checking**0297', amount: '1,374,471.55' },
          { name: 'Savings**7689', amount: '1,320,300.55' },
        ];
      default:
        return [];
    }
  }

  const handleAccordionClick = () => {
    setAccordionOpen(!isAccordionOpen);
  };

  const isHome = name === 'Home' || name === 'Transactions';


  const handleClick = () => {
    const linkPath = getLinkPath(name);
    if (linkPath) {
      navigate(linkPath);
    }
  };

  const getLinkPath = (linkName: string) => {
    const linkPathMap: { [key: string]: string } = {
      Home: '/', 
      Transactions: '/dashboard',
    };

    return linkPathMap[linkName] || '';
  };


  return (
      <Box _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="2"
          mx="2"
          borderRadius="lg"
          role="group"
          cursor={'pointer'}
          pointerEvents={'auto'}
          _hover={{ bg: 'cyan.400', color: 'white' }}
          onClick={isHome ? handleClick : handleAccordionClick}
          {...rest}
        >
          {icon && (
            <Icon
              mr="2"
              fontSize="16"
              _groupHover={isHome ? {} : { color: 'white' }}
              as={icon}
            />
          )}
          {name}
          {subItems.length > 0 && (
            <Icon as={isAccordionOpen ? FiChevronUp : FiChevronDown} ml="auto" />
          )}
        </Flex>
        {isAccordionOpen && subItems.length > 0 && (
          <Box ml="2" p="2">
            {subItems.map((subItem) => (
              <SubItem key={subItem.name} name={subItem.name} amount={subItem.amount} />
            ))}
          </Box>
        )}
      </Box>
  );
};

const SubItem = ({ name, amount }: { name: string; amount: string }) => {
  return (
    <Box ml="2" p="2">
      <Flex direction="row" align="center">
        <span style={{ fontSize: '13px' }}>{name}</span>
      </Flex>
      {amount && (
        <>
          <Icon as={FaDollarSign} fontSize="11px" color="green" ml="1" />
          <span style={{ fontSize: '11px', color: 'green' }}>{amount}</span>
        </>
      )}
    </Box>
  );
};
