/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Table, Modal } from 'antd';

import {
  titleOptions,
  nationalityOptions,
  genderOptions,
} from '../../../constants/options';

const { Column } = Table;

const checkingGender = value =>
  genderOptions.find(gender => gender.value === value);

const checkingNationality = value =>
  nationalityOptions.find(ntl => ntl.value === value);

export default props => {
  const { selectPerson, deletePerson, persons } = props;
  const dataSource = persons || [];
  return (
    <Table
      dataSource={dataSource}
      size="middle"
      pagination={false}
      rowKey="id"
      className="application-table"
    >
      <Column
        title="NAME"
        key="name"
        render={record => `${record.firstname} ${record.lastname}`}
      />
      <Column
        title="GENDER"
        dataIndex="gender"
        render={value => {
          const gender = checkingGender(value);

          return gender ? gender.display : '-';
        }}
      />
      <Column title="MOBILE PHONE" dataIndex="mobilePhone" />
      <Column
        title="NATIONALITY"
        dataIndex="nationality"
        render={value => {
          const nationality = checkingNationality(value);

          return nationality ? nationality.display : '-';
        }}
      />
      <Column
        title=" "
        key="action"
        dataIndex="id"
        render={(value, record) => (
          <span>
            <a onClick={() => selectPerson(value)}>EDIT</a> /{' '}
            <a
              onClick={() => {
                Modal.confirm({
                  title: 'Do you Want to delete these person?',
                  content: `${record.firstname} ${record.lastname}`,
                  onOk() {
                    deletePerson(value);
                  },
                });
              }}
            >
              DELETE
            </a>
          </span>
        )}
      />
    </Table>
  );
};
