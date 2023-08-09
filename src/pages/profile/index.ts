import { withStore } from '../../Store';
import { Profile } from './profile';

const withUser = withStore((state) => ({ ...state.currentUser }));

// @ts-ignore
export default withUser(Profile);
