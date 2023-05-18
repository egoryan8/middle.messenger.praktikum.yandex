import Handlebars, { HelperOptions } from 'handlebars';
import Block from './Block';

export function registerComponent(Component: typeof Block, componentName: string) {
  Handlebars.registerHelper(componentName, ({ hash, data }: HelperOptions) => {
    if (!data.root.children) {
      data.root.children = {};
    }
    const { children } = data.root;
    const component = new Component(hash);

    children[component.id] = component;

    return `<div data-id="id-${component.id}"></div>`;
  });
}
