import * as React from 'react';
import { Form } from 'antd';

import FormItem from './FormItem';

export interface IBasicFormProps {

}

export interface IBasicFormState {
  [key: string]: string | object | Array < any > ;
}

Form.create()
export default class BasicForm extends React.PureComponent <IBasicFormProps, IBasicFormState> {
  renderChild = (children: React.ReactNode): Array<React.ReactNode> => {
    return React.Children.map(children, (item: any) => {
      if (item.children) {
        return React.cloneElement(item, {}, ...this.renderChild(item.children))
      }
      return (
        <FormItem {...item.props}>
          {React.cloneElement(item)}
        </FormItem>
      ) 
    })
  }

  render() {
    const { children } = this.props;
    return ( 
      <Form>
        {this.renderChild(children)}
      </Form>
    )
  }
}