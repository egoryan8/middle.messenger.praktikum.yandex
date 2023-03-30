import Block from '../../utils/Block';
import template from './login.template';

export class LoginPage extends Block<{ onClick: Function }> {
  constructor() {
    super({
      // onClick: () => this.validate(),
      // goNext:
      events: {
        submit: (e: Event) => this.goNext(e),
      },
    });
  }

  goNext = (e: Event) => {
    console.log('NEXT');
    e.preventDefault();
    console.log(e);

    const values = Object.fromEntries(new FormData(e.target));
    console.log(values);
  };

  render() {
    return template;
  }
}
