import React, { useState, useRef } from 'react';
import {
  Form,
  Row,
  Col,
  Select,
  Input,
  DatePicker,
  Button,
  Radio,
  InputNumber,
  Card,
} from 'antd';
import moment from 'moment';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/dist/style.css';

import {
  titleOptions,
  nationalityOptions,
  genderOptions,
} from '../../../constants/options';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;

const DashSign = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      margin: '0 2px',
    }}
  >
    -
  </div>
);

export default Form.create({
  name: 'applicationForm',
  mapPropsToFields(props) {
    if (props.initialValues) {
      let idCardCreateField = {};
      if (props.initialValues.idCardNo) {
        idCardCreateField = {
          citizenFlag1: Form.createFormField({
            value: props.initialValues.idCardNo.substring(0, 1),
          }),
          citizenFlag2: Form.createFormField({
            value: props.initialValues.idCardNo.substring(1, 5),
          }),
          citizenFlag3: Form.createFormField({
            value: props.initialValues.idCardNo.substring(5, 10),
          }),
          citizenFlag4: Form.createFormField({
            value: props.initialValues.idCardNo.substring(10, 12),
          }),
          citizenFlag5: Form.createFormField({
            value: props.initialValues.idCardNo.substring(12, 13),
          }),
        };
      }
      return {
        title: Form.createFormField({
          value: props.initialValues.title,
        }),
        firstname: Form.createFormField({
          value: props.initialValues.firstname,
        }),
        lastname: Form.createFormField({
          value: props.initialValues.lastname,
        }),
        birthday: Form.createFormField({
          value: moment(props.initialValues.birthday),
        }),
        nationality: Form.createFormField({
          value: props.initialValues.nationality,
        }),
        ...idCardCreateField,
        gender: Form.createFormField({
          value: props.initialValues.gender,
        }),
        mobilePhone: Form.createFormField({
          value: props.initialValues.mobilePhone,
        }),
        passportNo: Form.createFormField({
          value: props.initialValues.passportNo,
        }),
        expectedSalary: Form.createFormField({
          value: props.initialValues.expectedSalary,
        }),
      };
    }
  },
})(({ form, onSubmit, isEdit, cancelEdit }) => {
  const { getFieldDecorator, validateFields, resetFields } = form;
  const citizenInput1 = useRef(null);
  const citizenInput2 = useRef(null);
  const citizenInput3 = useRef(null);
  const citizenInput4 = useRef(null);
  const citizenInput5 = useRef(null);

  const [currentKeyCode, setKeyCode] = useState(null);

  const handleKeyDown = e => setKeyCode(e.keyCode);

  const inputNumber = (e, flag, maxLength) => {
    let ref = null;

    switch (flag) {
      case 1:
        ref = {
          previousFlag: null,
          currentFlag: citizenInput1,
          nexFlag: citizenInput2,
        };
        break;
      case 2:
        ref = {
          previousFlag: citizenInput1,
          currentFlag: citizenInput2,
          nexFlag: citizenInput3,
        };
        break;
      case 3:
        ref = {
          previousFlag: citizenInput2,
          currentFlag: citizenInput3,
          nexFlag: citizenInput4,
        };
        break;
      case 4:
        ref = {
          previousFlag: citizenInput3,
          currentFlag: citizenInput4,
          nexFlag: citizenInput5,
        };
        break;
      case 5:
        ref = {
          previousFlag: citizenInput4,
          currentFlag: citizenInput5,
          nexFlag: null,
        };
        break;

      default:
        break;
    }

    const keyCode = currentKeyCode;
    const value = e.target.value;

    if (keyCode === 8 && value.length === 0) {
      if (ref.previousFlag) {
        ref.previousFlag.current.focus();
      }
    }

    if (value.length === maxLength) {
      if (ref.nexFlag) {
        ref.nexFlag.current.focus();
      }
    }

    return e;
  };

  return (
    <Card bodyStyle={{ background: '#f9f9f9' }} style={{ marginBottom: 24 }}>
      <Form
        className="appliaction-form"
        onSubmit={e => {
          e.preventDefault();
          validateFields((err, values) => {
            if (!err) {
              onSubmit(values);
              resetFields();
            }
          });
        }}
      >
        <Row gutter={16}>
          <Col sm={6} xs={24}>
            <FormItem label="Title">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: 'Select title!',
                  },
                ],
              })(
                <Select>
                  {titleOptions.map(title => (
                    <Option value={title.value} key={title.value}>
                      {title.display}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col sm={9} xs={24}>
            <FormItem label="Firstname">
              {getFieldDecorator('firstname', {
                rules: [
                  {
                    required: true,
                    message: 'Input firstname!',
                  },
                  {
                    max: 50,
                    message: 'Must be 50 charactors or less!',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col sm={9} xs={24}>
            <FormItem label="Lastname">
              {getFieldDecorator('lastname', {
                rules: [
                  {
                    required: true,
                    message: 'Input lastname!',
                  },
                  {
                    max: 50,
                    message: 'Must be 50 charactors or loess!',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col sm={8} xs={24}>
            <FormItem label="Birthday">
              {getFieldDecorator('birthday', {
                rules: [
                  {
                    required: true,
                    message: 'Select birthday!',
                  },
                ],
              })(
                <DatePicker
                  format="MM/DD/YY"
                  style={{ width: '100%' }}
                  placeholder={null}
                />,
              )}
            </FormItem>
          </Col>
          <Col sm={16} xs={24}>
            <FormItem label="Nationality">
              {getFieldDecorator('nationality', {})(
                <Select placeholder="-- Please Select --" allowClear>
                  {nationalityOptions.map(title => (
                    <Option value={title.value} key={title.value}>
                      {title.display}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24}>
            <FormItem label="Citizen ID">
              <div className="citizen-input">
                <FormItem>
                  {getFieldDecorator('citizenFlag1', {})(
                    <Input
                      maxLength={1}
                      onKeyDown={e => handleKeyDown(e)}
                      onChange={e => inputNumber(e, 1, 1)}
                      ref={citizenInput1}
                      style={{ width: 33 }}
                    />,
                  )}
                </FormItem>
                <DashSign />
                <FormItem>
                  {getFieldDecorator('citizenFlag2', {})(
                    <Input
                      maxLength={4}
                      onKeyDown={e => handleKeyDown(e)}
                      onChange={e => inputNumber(e, 2, 4)}
                      ref={citizenInput2}
                      style={{ width: 56 }}
                    />,
                  )}
                </FormItem>
                <DashSign />
                <FormItem>
                  {getFieldDecorator('citizenFlag3', {})(
                    <Input
                      maxLength={5}
                      onKeyDown={e => handleKeyDown(e)}
                      onChange={e => inputNumber(e, 3, 5)}
                      ref={citizenInput3}
                      style={{ width: 62 }}
                    />,
                  )}
                </FormItem>
                <DashSign />
                <FormItem>
                  {getFieldDecorator('citizenFlag4', {})(
                    <Input
                      maxLength={2}
                      onKeyDown={e => handleKeyDown(e)}
                      onChange={e => inputNumber(e, 4, 2)}
                      ref={citizenInput4}
                      style={{ width: 40 }}
                    />,
                  )}
                </FormItem>
                <DashSign />
                <FormItem>
                  {getFieldDecorator('citizenFlag5', {})(
                    <Input
                      maxLength={1}
                      onKeyDown={e => handleKeyDown(e)}
                      onChange={e => inputNumber(e, 5, 1)}
                      ref={citizenInput5}
                      style={{ width: 33 }}
                    />,
                  )}
                </FormItem>
              </div>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24}>
            <FormItem label="Gender">
              {getFieldDecorator('gender', {})(
                <RadioGroup>
                  {genderOptions.map(gender => (
                    <Radio value={gender.value} key={gender.value}>
                      {gender.display}
                    </Radio>
                  ))}
                </RadioGroup>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col sm={10} xs={24}>
            <FormItem label="Mobile Phone">
              {getFieldDecorator('mobilePhone', {
                rules: [
                  {
                    required: true,
                    message: 'Input mobile phone!',
                  },
                ],
              })(
                <PhoneInput
                  preferredCountries={['th']}
                  defaultCountry={'th'}
                  inputClass="ant-input"
                  style={{ width: '100%' }}
                />,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col sm={10} xs={24}>
            <FormItem label="Passport No">
              {getFieldDecorator('passportNo', {
                rules: [
                  {
                    pattern: /[a-zA-Z]{2}[0-9]{7}/,
                    message: 'Passport number is invalid',
                  },
                ],
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16} type="flex" justify="space-between">
          <Col sm={14} xs={24}>
            <FormItem label="Expected Salary ">
              {getFieldDecorator('expectedSalary', {})(
                <InputNumber
                  formatter={value =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  min={0}
                  max={1000000}
                />,
              )}
              <span className="ant-form-text"> THB</span>
            </FormItem>
          </Col>
          <Col sm={10} xs={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              SUBMIT
            </Button>{' '}
            {isEdit && (
              <Button type="danger" onClick={() => cancelEdit()}>
                CANCEL
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </Card>
  );
});
