import React from "react";
import { Link } from 'react-router-dom';
import s from './style.module.scss';
import cn from "classnames";
import Icon from '../ui/Icon/Icon';
import FormAuthorization from './forms/FormAuthorization';

function Authorization({checkAuthorizationForm}) {

	return (
		<>
			<h3 className={s.auth__title}>ВХОД</h3>
			<FormAuthorization type="register" style={s.form} inputStyle={s.form__input} />
			<div className={s.auth__text}>или продолжить через:</div>
			<div className={cn(s.auth__social, s.social)}>
				<Link to="#">
					<Icon className={s.social__img} iconPath="VK" alt="VK" />
				</Link>
				<Link to="#">
					<Icon className={s.social__img} iconPath="Yandex" alt="Yandex" />
				</Link>
				<Link to="#">
					<Icon className={s.social__img} iconPath="Google" alt="Google" />
				</Link>
			</div>
			<div className={s.auth__text}>Еще не зарегистрированы?</div>
			<button className={s.auth__btn}
				onClick={() => checkAuthorizationForm(true)}>РЕГИСТРАЦИЯ</button>
		</>
	);
};

export default Authorization;
