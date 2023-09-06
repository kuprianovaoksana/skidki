import { Link } from 'react-router-dom';
import s from './Register.module.scss';
import Icon from '../../../UI/Icon/Icon';
import Form from '../../../UI/Form/Form';

const Register = () => {
	return (
		<div className={s.auth}>
			<div className={s.exit}>
				<Icon style={s.exit__img} iconPath="Exit" alt="exit" />
			</div>
			<p className={s.condition}>
				Чтобы отслеживать скидки на товар <br /> и получать уведомления
				необходимо <br /> <strong>Войти</strong> или
				<strong> Зарегистрироваться</strong>
			</p>
			<h3 className={s.entry}>РЕГИСТРАЦИЯ</h3>
			<Form type="register" style={s.form} inputStyle={s.form__input} />
			<div className={s.social}>
				<p className={s.social__header}>или продолжить через:</p>
				<div className={s.social__container}>
					<Link to="#">
						<Icon style={s.social__img} iconPath="VK" alt="VK" />
					</Link>
					<Link to="#">
						<Icon style={s.social__img} iconPath="Yandex" alt="Yandex" />
					</Link>
					<Link to="#">
						<Icon style={s.social__img} iconPath="Google" alt="Google" />
					</Link>
				</div>
			</div>

			<div className={s.register}>
				<p className={s.register__header}>Еще не зарегистрированы?</p>
				<Link className={s.register__link}>
					<strong>РЕГИСТРАЦИЯ</strong>
				</Link>
			</div>
			<div className={s.politic}>
				Продолжая, вы соглашаетесь с{' '}
				<strong className={s.politic__bold}>Условиями использования</strong>{' '}
				<br />и{' '}
				<strong className={s.politic__bold}>
					Политикой конфиденциальности
				</strong>{' '}
				сервиса
			</div>
		</div>
	);
};

export default Register;
