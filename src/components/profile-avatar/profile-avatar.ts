import Block from '../../utils/Block';
import UserController from '../../controllers/UserController';

interface IAvatarProps {
  avatar: string;
  isLoading: boolean;
}

interface IAvatar extends IAvatarProps {
  avatar: string;
  events: {
    change: Function;
  };
}
export class ProfileAvatar extends Block<IAvatar> {
  constructor(props: IAvatarProps) {
    super({
      ...props,
      events: {
        change: (e: any) => {
          try {
            this.props.isLoading = true;
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('avatar', file);
            UserController.changeAvatar(formData)
              .then(() => {
                this.props.isLoading = false;
              });
          } catch (err: any) {
            alert(`Произошла ошибка при смене автара! ${err.reason}`);
            this.props.isLoading = false;
          }
        },
      },
    });
  }

  render() {
    const hostResources = 'https://ya-praktikum.tech/api/v2/resources/';
    const {
      avatar,
    } = this.props;
    const avatarURL = avatar ? `${hostResources}${avatar}` : 'https://racksmetal.ru/assets/images/products/1147/noimg-2-1.jpg';

    if (this.props.isLoading) {
      return `
      <div class="profile__img-overlay-wrapper">
        <span class="profile__img avatar-loader"></span>
      </div>
      `;
    }

    return `
    <div class="profile__img-overlay-wrapper">
       <img class="profile__img" src=${avatarURL} alt="аватар пользователя">
       <label for="file" class="profile__img-overlay">
          Поменять аватар
          <input class="profile__img-input" type="file" id="file" >
       </label>
    </div>
    `;
  }
}
