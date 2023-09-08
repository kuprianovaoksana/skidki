import s from './Auth.module.scss';
import Enter from './Enter/Enter';
import Register from './Register/Register';

const Auth = ({ showEntry, showRegister, isShowEntry, isShowRegister }) => {
	const showAuth = () => {
		if (isShowEntry) {
			return (
				<div
					style={{ display: isShowEntry ? 'absolute' : 'none' }}
					className={s.container}
				>
					<Enter showEntry={showEntry} />
				</div>
			);
		}
		if (isShowRegister) {
			return (
				<div
					style={{ display: isShowRegister ? 'absolute' : 'none' }}
					className={s.container}
				>
					<Register showRegister={showRegister} />
				</div>
			);
		}
	};
	return showAuth();
};

export default Auth;
