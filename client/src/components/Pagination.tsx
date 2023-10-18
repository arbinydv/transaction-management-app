import React from 'react';
import {
  Flex,
  Button,
} from "@chakra-ui/react";

interface PaginationProps {
  nPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages).keys()].map((page) => page + 1);

  const nextPage = () => {
    if (currentPage < nPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <Flex justify="center" align="center" paddingTop={"10px"}>
      <Button
        size="sm"
        variant="outline"
        onClick={prevPage}
        disabled={currentPage === 1}
        margin={"5px"}
      >
        Previous
      </Button>
      {pageNumbers.map((pgNumber) => (
        <Button
          key={pgNumber}
          size="sm"
          margin={"5px"}
          variant={currentPage === pgNumber ? "solid" : "outline"}
          onClick={() => setCurrentPage(pgNumber)}
        >
          {pgNumber}
        </Button>
      ))}
      <Button
        size="sm"
        margin={"5px"}
        variant="outline"
        onClick={nextPage}
        disabled={currentPage === nPages}
      >
        Next
      </Button>
    </Flex>
  );
};

export default Pagination;
