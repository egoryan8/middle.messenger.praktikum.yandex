// eslint-disable-next-line max-classes-per-file
import { EventBus } from '../utils/EventBus';
import Block from '../utils/Block';
import { DialogItemProps } from '../components/dialog-item';
import { Indexed } from '../utils/helpers/merge';
import { set } from '../utils/helpers/set';
import { isEqual } from '../utils/helpers/isEqual';

export enum StoreEvents {
  Updated = 'updated',
}

export interface IUserData {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

interface ILastMessage {
  time: string;
  content: string;
  user: IUserData;
}

export interface IChatData {
  id: number;
  title: string;
  avatar: string | null;
  created_by: number;
  unread_count: number;
  last_message: ILastMessage;
}

interface IStoreData {
  currentUser?: IUserData;
  chatList?: IChatData[];
  currentChatId?: string;
  messageList: DialogItemProps[];
  isChatLoading: boolean;
}

class Store extends EventBus {
  private state: Indexed = {};

  public getState() {
    // console.log(this.state);

    return this.state;
  }

  public set(path: keyof IStoreData, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }

  public clearUserInfo() {
    this.set('currentUser', {});
    this.set('chatList', []);
    this.set('currentChatId', '');
    this.set('messageList', []);
    this.set('isChatLoading', false);
  }
}
export const store = new Store();

export const withStore = (mapStateToProps: (state: Indexed<any>) => Record<string, unknown>) => (Component: typeof Block) => {
  let state: Record<string, unknown>;

  return class extends Component<any> {
    constructor(props: any) {
      state = mapStateToProps(store.getState());

      super({ ...props, ...state });

      store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState());

        if (!isEqual(state, newState)) {
          this.setProps({ ...newState });
        }
      });
    }
  };
};
