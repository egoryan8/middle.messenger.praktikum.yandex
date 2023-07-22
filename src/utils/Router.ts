/* eslint-disable no-underscore-dangle */
import Block from './Block';
import { Route } from './Route';

class Router {
  private routes: Route[] = [];

  private history: any = window.history;

  private _currentRoute: Route | null = null;

  private static __instance: Router;

  constructor() {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;

    Router.__instance = this;
  }

  public use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, { rootQuery: '#app' });

    this.routes.push(route);

    return this;
  }

  public start = (): void => {
    window.onpopstate = (event: PopStateEvent): void => {
      this._onRoute((<Window>event.currentTarget).location.pathname);
    };

    this.history.pushState('', '', window.location.pathname);
    this._onRoute(window.location.pathname);
  };

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    this._currentRoute = route;

    route.render();
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default Router;
