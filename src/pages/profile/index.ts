import { withStore } from '../../Store';
import { Profile } from './profile';

const withUser = withStore((state) => ({ ...state.currentUser }));

export default withUser(Profile);
