import Popup from '../../UI/Popup/Popup';
import Enter from './Enter/Enter';
import Register from './Register/Register';

const Auth = ({ showEntry, showRegister, isShowEntry, isShowRegister }) => {
	const showAuth = () => {
		if (isShowEntry) {
			return (
				<Popup isShow={isShowEntry}>
					<Enter showEntry={showEntry} />
				</Popup>
			);
		}
		if (isShowRegister) {
			return (
				<Popup isShow={isShowRegister}>
					<Register showRegister={showRegister} />
				</Popup>
			);
		}
	};
	return showAuth();
};

export default Auth;
