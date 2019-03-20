import * as React from 'react';

interface componentTreeItem {
  component: string;
  componentId: string;
  parent ? : string;
  props ? : object;
  children ? : Array < componentTreeItem > ;
}

interface componentsMap {
  [key: string]: any;
}

interface BuilderProps {
  componentTree: componentTreeItem;
  components: componentsMap;
}

interface defaultProps {

}

let components: componentsMap = null;
let elementProps: defaultProps = null;

const createElement = (componentItem: componentTreeItem): React.ReactElement => {
  const {
    component: name,
    componentId,
    children = [],
    props
  } = componentItem;
  const node = components && components[name];

  if (node) {
    return React.createElement(node as any, {
        key: componentId,
        ...props,
        ...elementProps
      },
      ...children.map(createElement))
  } else {
    console.log(`${name} is not a component`);
  }
}

export const Builder = <P>(props: BuilderProps): React.ReactElement<P> => {
  const {
    componentTree,
    components: comps,
    ...otherProps
  } = props;

  components = comps;
  elementProps = otherProps;

  return createElement(componentTree);
}