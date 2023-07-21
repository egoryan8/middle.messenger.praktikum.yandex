import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import { EventBus } from './EventBus';

abstract class Block<Props extends {}> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = nanoid(6);

  private _element: HTMLElement | null = null;

  protected props: Props;

  protected children: Record<string, any>;

  private eventBus: () => EventBus;

  constructor(propsAndChildren: any = {}) {
    const eventBus = new EventBus();
    const { props, children } = this.getChildren(propsAndChildren);

    this.children = children;

    this.props = this._makePropsProxy(props);

    this.initChildren();
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  getChildren(propsAndChildren: any) {
    const children: any = {};
    const props: any = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value) && value.every((v) => v instanceof Block)) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  protected initChildren() { }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() { }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(oldProps: Props, newProps: Props) {
    return true;
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const templateString = this.render();
    const fragment = this.compile(templateString, { ...this.props });
    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
  }

  protected render(): string {
    return '';
  }

  getContent(): HTMLElement | null {
    return this.element;
  }

  private _makePropsProxy(props: Props) {
    return new Proxy(props, {
      get: (target: any, prop: string) => {
        const value = target[prop];

        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: Record<string, unknown>, prop: string, value: unknown) => {
        const oldProps = { ...target };

        target[prop] = value;

        // Запускаем обновление компоненты
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);

        return true;
      },
      deleteProperty: () => {
        throw new Error('Нет доступа');
      },
    });
  }

  private _addEvents() {
    const { events } = this.props as Props;

    if (!events) {
      return;
    }
    Object.entries(events as Record<string, () => void>).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  private _removeEvents() {
    const { events } = this.props as Props;

    if (!events || !this._element) {
      return;
    }
    Object.entries(events as Record<string, () => void>).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  compile(templateString: string, context: Record<string, any>) {
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    const template = Handlebars.compile(templateString);

    fragment.innerHTML = template({ ...context, children: this.children });
    Object.entries(this.children).forEach(([, child]) => {
      const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);

      if (!stub) {
        return;
      }
      stub.replaceWith(child.getContent()!);
    });

    return fragment.content;
  }
}

export default Block;
