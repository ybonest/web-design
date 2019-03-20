import * as React from "react";

const RenderImg = () => {
  return <img alt="example" src='../src/assets/dog.jpg' />;
}

export default {
  component: 'Card',
  componentId: 'card',
  props: {
    style: {width: 300},
    cover: RenderImg()
  },
  children: [
    {
      component: 'Empty',
      componentId: 'Empty',
      props: {
        description: '暂无数据'
      }
    }
  ]
}