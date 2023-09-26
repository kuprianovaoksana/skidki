import { Link } from 'react-router-dom';
import s from './style.module.scss';
import cn from "classnames";
import Icon from '../ui/Icon/Icon';
import FormRegister from './forms/FormRegister';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

function Register({checkAuthorizationForm}) {


	return (
		<>
			<h3 className={s.auth__title}>РЕГИСТРАЦИЯ</h3>
			<FormRegister type="register" style={s.form} inputStyle={s.form__input} />
			<p className={s.auth__text}>или продолжить через:</p>
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
			<p className={s.auth__text}>У Вас уже есть аккаунт?</p>
			<button className={s.auth__btn}
				onClick={() => checkAuthorizationForm(false)}>Войти</button>
		</>
	);
};

export default Register;
