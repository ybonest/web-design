import * as React from 'react';
import { Form } from 'antd'

export interface IFormItemProps {
  form: any;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, values: any) => {};
  children: React.ReactElement;
}

type messageType = {
  [name: string]: object;
}

export interface IFormItemState {
  message?: messageType;
}

export default class FormItem extends React.PureComponent<IFormItemProps, IFormItemState> {
  static defaultProps = {
    onChange: () => {}
  }

  state: IFormItemState = {};

  onItemChange = (e: React.ChangeEvent<HTMLInputElement>, values: any) => {
    this.props.onChange(e, values);
  }

  setErrorMessage = (message: string) => {
    const { name } = this.props;

    this.setState({
      message: { [name]: 
        {
          help: message,
          validateStatus: 'error'
        }
      }
    })
  }

  getErrorMessage = () => {

  }

  render() {
    const { form, name, children } = this.props;
    const { message } = this.state;
    const options = {}; // 

    return (
      <Form.Item {...message[name]}>
        {form.getFieldDecorator(name, options)(
          React.cloneElement(children, { onChange: this.onItemChange })
        )}
      </Form.Item>
    )
  }
}