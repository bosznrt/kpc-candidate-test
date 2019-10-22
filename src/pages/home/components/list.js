/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, Fragment } from 'react';
import { Table, Modal, Row, Col, Button, Pagination } from 'antd';

import { nationalityOptions, genderOptions } from '../../../constants/options';

const { Column } = Table;

const checkingGender = value =>
  genderOptions.find(gender => gender.value === value);

const checkingNationality = value =>
  nationalityOptions.find(ntl => ntl.value === value);

const itemRender = (current, type, originalElement) => {
  if (type === 'prev') {
    return <a>Previous</a>;
  }
  if (type === 'next') {
    return <a>Next</a>;
  }
  return originalElement;
};

export default props => {
  const { selectPerson, deletePerson, deleteMultiple, persons } = props;
  const [selectedRowKeys, setRowSelect] = useState([]);
  const [currentPage, changePage] = useState(1);

  const pageSize = 5;
  const dataSource =
    persons.slice((currentPage - 1) * pageSize, currentPage * pageSize) || [];
  return (
    <Fragment>
      <Row type="flex" justify="space-between">
        <Col span={12}>
          <Button
            type="danger"
            onClick={() => {
              Modal.confirm({
                title: 'Do you want to delete person are selected?',
                onOk() {
                  deleteMultiple(selectedRowKeys);
                  changePage(1);
                },
              });
            }}
            disabled={!selectedRowKeys.length}
            style={{ marginBottom: 8 }}
          >
            DELETE
          </Button>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Pagination
            total={persons.length}
            itemRender={itemRender}
            pageSize={pageSize}
            onChange={page => changePage(page)}
          />
        </Col>
      </Row>
      <Table
        dataSource={dataSource}
        size="middle"
        pagination={false}
        rowKey="id"
        className="application-table"
        rowSelection={{
          selectedRowKeys,
          onChange: key => setRowSelect(key),
        }}
      >
        <Column
          title="NAME"
          key="name"
          className="custom-td-wrap"
          render={record => `${record.firstname} ${record.lastname}`}
        />
        <Column
          title="GENDER"
          dataIndex="gender"
          className="custom-td-wrap"
          render={value => {
            const gender = checkingGender(value);

            return gender ? gender.display : '-';
          }}
        />
        <Column
          title="MOBILE PHONE"
          dataIndex="mobilePhone"
          className="custom-td-wrap"
        />
        <Column
          title="NATIONALITY"
          dataIndex="nationality"
          className="custom-td-wrap"
          render={value => {
            const nationality = checkingNationality(value);

            return nationality ? nationality.display : '-';
          }}
        />
        <Column
          title=" "
          key="action"
          dataIndex="id"
          className="custom-td-wrap"
          render={(value, record) => (
            <span>
              <a onClick={() => selectPerson(value)}>EDIT</a> /{' '}
              <a
                onClick={() => {
                  Modal.confirm({
                    title: 'Do you want to delete these person?',
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
    </Fragment>
  );
};
