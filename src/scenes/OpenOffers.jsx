import React, { Component } from 'react';

import Container from '../components/Container';
import Table from '../components/Table';

const dataSource = [{
  key: '1',
  name: 'Mike',
  age: 32,
  address: '10 Downing Street'
}, {
  key: '2',
  name: 'John',
  age: 42,
  address: '10 Downing Street'
}];

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}];

class OpenOffers extends Component {
  render() {
    return (
      <Container>
        <Table
          columns={columns}
          dataSource={dataSource}
          render={source => (
            <tr key={source.key}>
              <td>{ source.name }</td>
              <td>{ source.age }</td>
              <td>{ source.address }</td>
            </tr>
          )} />
      </Container>
    );
  }
}
 
export default OpenOffers;
