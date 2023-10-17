import React from 'react';
import { BiSolidBank } from "react-icons/bi";
import { IconType } from 'react-icons';
import {
    FiChevronDown,
    FiChevronUp,
    FiHome,
    FiList,
    FiRepeat,
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


  interface LinkItemProps {
    name: string;
    icon: IconType;
  }
  
  const LinkItems: Array<LinkItemProps> = [
    { name: 'Home', icon: FiHome },
    { name: 'Transactions', icon: FiList },
    { name: 'Payments', icon: FiRepeat },
    { name: 'Accounts', icon: BiSolidBank },
  ];
  
  export default function SimpleSidebar() {
    const { isOpen, onClose } = useDisclosure();
  
    return (
      <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
        <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
        <Drawer isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size="full">
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
      </Box>
    );
  }
  
  interface SidebarProps extends BoxProps {
    onClose: () => void;
  }
  
  const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
        {...rest}
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Transactions
          </Text>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        ))}
      </Box>
    )
  };
  
  interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
  }
  
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
    const [isAccordionOpen, setAccordionOpen] = React.useState(children === 'Transactions' || children === 'Accounts');
    const subItems = getSubItems(children);

    function getSubItems(linkName) {
        switch (linkName) {
          case 'Payments':
            return ['Card', 'Capital'];
          case 'Accounts':
            return ['Credit', 'Ops/ Payroll', 'AP'];
          default:
            return [];
        }
    }

    const handleAccordionClick = () => {
      setAccordionOpen(!isAccordionOpen);
    };
  
    return (
      <Box
        as="a"
        href="#"
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
          onClick={handleAccordionClick}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
          {children === 'Payments' || children === 'Accounts' ? (
          isAccordionOpen ? (
            <Icon as={FiChevronUp} ml="auto" />
          ) : (
            <Icon as={FiChevronDown} ml="auto" />
          )
        ) : null}
        </Flex>
        {isAccordionOpen && subItems.length > 0 && (
        <Box ml="6" p="2">
          {subItems.map((subItem) => (
            <SubItem key={subItem}>{subItem}</SubItem>
          ))}
          </Box>
        )}
      </Box>
    );
  };
  
  const SubItem = ({ children }: { children: ReactText }) => {
    return (
      <Box as="a" href="#" ml="2" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex align="center" p="2" borderRadius="lg" cursor="pointer" _hover={{ bg: 'cyan.400', color: 'white' }}>
          {children}
        </Flex>
      </Box>
    );
  };
  