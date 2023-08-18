import Block from './Block';

export class Route {
  private _pathname: string;

  private _blockClass: typeof Block;

  private _block: Block<any> | null;

  private _props: Record<string, unknown>;

  constructor(pathname: string, view: typeof Block, props: any) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  private _render(query: string, block: any) {
    const root = document.querySelector(query);
    // root.innerHTML = '';
    root?.append(block.getContent());
    block.dispatchComponentDidMount();

    return root;
  }

  render() {
    if (!this._block) {
      // @ts-ignore
      this._block = new this._blockClass();
      // @ts-ignore
      this._render(this._props.rootQuery, this._block);

      return;
    }
    // @ts-ignore
    this._render(this._props.rootQuery, this._block);
  }
}
