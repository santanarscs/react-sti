import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Container, Item, NumberContainer } from './styles';

interface IPaginationProps {
  currentPage: number;
  total: number;
  limit: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({
  total,
  currentPage,
  setCurrentPage,
  limit,
}) => {
  const [arrayPages, setArrayPages] = useState<number[]>([]);
  useEffect(() => {
    const totalPages = Math.ceil(total / limit);
    const links = Array(totalPages).fill('');
    setArrayPages(links.map((link, index) => index + 1));
  }, [total, limit]);
  return (
    <Container>
      <div>
        Total:
        {total}
      </div>
      <NumberContainer>
        {currentPage > 1 && (
          <Item onClick={() => setCurrentPage(currentPage - 1)}>
            <FiArrowLeft size={20} />
          </Item>
        )}
        {arrayPages.map((page) => (
          <Item
            isSelect={page === currentPage}
            key={page}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Item>
        ))}
        {currentPage < arrayPages.length && (
          <Item onClick={() => setCurrentPage(currentPage + 1)}>
            <FiArrowRight size={20} />
          </Item>
        )}
      </NumberContainer>
    </Container>
  );
};

export default Pagination;
