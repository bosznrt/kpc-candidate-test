import React, { useState } from 'react';
import { Layout, Row, Col, notification } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import uuidv4 from 'uuid/v4';

import {
  SUBMIT_DATA,
  UPDATE_DATA,
  DELETE_DATA,
  DELETE_MULTIPLE_DATA,
} from '../../reducers/appReducer';
import ApplicationForm from './components/form';
import ApplicationList from './components/list';

const { Content } = Layout;

export default () => {
  const dispatch = useDispatch();
  const persons = useSelector(state => state.app.list);

  const [current, changeCurrent] = useState(undefined);

  const selectedPerson = persons.find(person => person.id === current);

  const initialValues = selectedPerson ? { ...selectedPerson } : null;
  return (
    <Content style={{ margin: 8 }}>
      <Row type="flex" justify="center">
        <Col
          xxl={8}
          xl={14}
          lg={16}
          md={18}
          sm={20}
          xs={24}
          style={{ minHeight: '100vh' }}
        >
          <ApplicationForm
            initialValues={initialValues}
            isEdit={selectedPerson}
            cancelEdit={() => changeCurrent(undefined)}
            onSubmit={values => {
              const {
                citizenFlag1,
                citizenFlag2,
                citizenFlag3,
                citizenFlag4,
                citizenFlag5,
                birthday,
              } = values;

              let idCardNo = undefined;

              if (
                citizenFlag1 &&
                citizenFlag2 &&
                citizenFlag3 &&
                citizenFlag4 &&
                citizenFlag5
              ) {
                idCardNo = `${citizenFlag1}${citizenFlag2}${citizenFlag3}${citizenFlag4}${citizenFlag5}`;
              }

              const person = {
                ...values,
                id: uuidv4(),
                idCardNo,
                birthday: moment(birthday).format('YYYY-MM-DD'),
              };

              if (selectedPerson) {
                const personsWithoutCurrent = persons.filter(
                  person => person.id !== current,
                );
                const updatedPerson = [...personsWithoutCurrent, person];
                dispatch({ type: UPDATE_DATA, payload: updatedPerson });
              } else {
                dispatch({ type: SUBMIT_DATA, payload: person });
              }

              notification['success']({
                message: 'สำเร็จ !!',
                description: 'บันทึกข้อมูลเรียบร้อย',
                duration: 3,
              });
            }}
          />
          <ApplicationList
            persons={persons}
            selectPerson={id => changeCurrent(id)}
            deletePerson={id => dispatch({ type: DELETE_DATA, payload: id })}
            deleteMultiple={ids =>
              dispatch({ type: DELETE_MULTIPLE_DATA, payload: ids })
            }
          />
        </Col>
      </Row>
    </Content>
  );
};
