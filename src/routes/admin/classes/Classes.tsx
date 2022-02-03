import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';

import Section from '../../../components/Section';
import Header from '../../../components/Header';
import { PrimaryButton } from '../../../components/Button';
import columns from './columns';
import { Link } from 'react-router-dom';

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 24px;
  align-items: center;

  h1 {
    font-size: 18px;
  }
`;

const TableScroll = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 24px;
`;

const Table = styled.table`
  display: table;
  width: 100%;
  border-collapse: collapse;
  border: 0;
  background-color: white;
  border-radius: 4px;
  border-spacing: 0;
  table-layout: auto;
  vertical-align: middle;
`;

const Th = styled.th`
  background-color: #e9ebed;
  border-bottom: 1px solid #d0d4d7;
  color: #49545c;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 1.8px;
  line-height: 1.3;
  padding: 18px;
  text-align: left;
  text-transform: uppercase;
  white-space: nowrap;
`;

const Td = styled.td`
  cursor: pointer;
  padding: 18px;
  background-color: inherit;
  border-bottom: 1px solid #d0d4d7;
  color: #49545c;
  font-size: 16px;
  line-height: 1.75;
  position: relative;
  z-index: 1;
`;

const Empty = styled.span`
  padding: 12px;
  display: block;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Classes = () => {
  const [data, setData] = useState([]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: useMemo(() => columns, []),
    data: useMemo(() => data, []),
  });

  return (
    <Section>
      <Header />
      <Row>
        <h1>Administer Classes</h1>
        <PrimaryButton as={StyledLink} to="/admin/classes/new">
          Create New Class
        </PrimaryButton>
      </Row>
      <TableScroll>
        <Table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>;
                  })}
                </tr>
              );
            })}
          </tbody>
          {data.length === 0 && <Empty>No classes have been added yet.</Empty>}
        </Table>
      </TableScroll>
    </Section>
  );
};

export default Classes;
