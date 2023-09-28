import React from "react";
import s from './style.module.scss';
import Register from './Register';
import PopupWindow from '../ui/PopupWindow/PopupWindow';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { showWindowAuth } from '../../store/slices/windowStateSlice';
import Authorization from './Authorization';

function Auth() {
	const { windowAuth } = useSelector((state) => state.statePopupWindow);
	const [ isAuthorizationForm, changeAuthorizationForm ] = React.useState(true);

	return (
		<>
		{windowAuth &&
			<PopupWindow isPopupAbsolute={true}
				closeWindow={showWindowAuth}
				children={
					<div className={s.auth}>
						<div className={s.auth__description}>Для того, чтобы отслеживать скидки на товар и получать уведомления необходимо<br/>
							<strong className={s.auth}>Войти</strong>{' или '}
							<strong className={s.auth}>Зарегистрироваться</strong>
						</div>
						{isAuthorizationForm
						? <Authorization changeAuthorizationForm={changeAuthorizationForm} />
						: <Register changeAuthorizationForm={changeAuthorizationForm} />}
						<div className={s.auth__description_under}>{'Продолжая, вы соглашаетесь с '}
							<Link className={s.auth__link}>Условиями использования</Link>{' и '}
							<Link className={s.auth__link}>Политикой конфиденциальности сервиса</Link>
						</div>
					</div>}
				/>}
		</>
	);
};

export default Auth;
