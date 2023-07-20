import { withStore } from '../../Store';
import { PasswordEdit } from './password-edit';

const withUser = withStore((state) => ({ ...state.currentUser }));

export default withUser(PasswordEdit);
