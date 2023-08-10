import Handlebars, { HelperOptions } from 'handlebars';

export function registerComponent(Component: any, componentName: string) {
  Handlebars.registerHelper(componentName, ({ hash, data }: HelperOptions) => {
    if (!data.root.children) {
      data.root.children = {};
    }
    const { children } = data.root;
    // @ts-ignore
    const component = new Component(hash);

    children[component.id] = component;

    return `<div data-id="id-${component.id}"></div>`;
  });
}
