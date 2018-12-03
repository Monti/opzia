import React, { Component } from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  border-collapse: collapse;
  font-size: 0.9em;
  text-align: left;
  width: 100%;

  th, td {
    padding: 12px;
  }

  th {
    background-color: #F5F6F8;
    font-family: 'Rubik';
    padding: 12px;

    &:not(:last-child) {
      border-right: 2px solid #fff;
    }
  }
`;

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  render() { 
    const { columns, dataSource } = this.props;

    return (
      <StyledTable>
        <thead>
          <tr>
            { columns.map(column => (
              <th key={column.key}>{ column.title }</th>
            ))}
          </tr>
        </thead>
        <tbody>
          { dataSource.map(source => this.props.render(source)) }
        </tbody>
      </StyledTable>
    );
  }
}
 
export default Table;
