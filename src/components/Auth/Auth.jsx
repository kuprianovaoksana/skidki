import { Link } from 'react-router-dom';
import s from './Auth.module.scss';

const Auth = () => {
	const iconsPath = process.env.PUBLIC_URL + '/images/icons/';
	const getIcon = (icon) => iconsPath + icon + '.svg';
	return (
		<div className={s.container}>
			<div className={s.auth}>
				<svg
					width="666"
					height="36"
					viewBox="0 0 666 36"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M648 15.3333L657.333 6L660 8.66664L650.667 17.9999L660 27.3331L657.333 29.9997L648 20.6666L638.667 29.9997L636 27.3331L645.333 17.9999L636 8.66664L638.667 6L648 15.3333Z"
						fill="#361D7E"
					/>
				</svg>
				<p>
					Для того, чтобы отслеживать скидки на товар <br /> и получать
					уведомления необходимо <br /> <strong>Войти</strong> или
					<strong>Зарегистрироваться</strong>
				</p>
				<h3>ВХОД</h3>
				<form>
					<div>
						<label htmlFor="">Электронная почта</label>
						<input type="mail" />
					</div>
					<div>
						<label htmlFor="">Введите пароль</label>
						<input type="mail" />
					</div>
					<Link to="#">Забыли пароль</Link>
					<button type="submit">Войти</button>
				</form>
				<div>
					<p>или продолжить через:</p>
					<div>
						<Link to="#">
							<img src={getIcon('VK')} alt="VK" />
						</Link>
						<Link to="#">
							<img src={getIcon('Yandex')} alt="Yandex" />
						</Link>
						<Link to="#">
							<img src={getIcon('Google')} alt="Google" />
						</Link>
					</div>
				</div>

				<div>
					<p>Еще не зарегистрированы?</p>
					<Link>РЕГИСТРАЦИЯ</Link>
				</div>
				<div>
					Продолжая, вы соглашаетесь с <strong>Условиями использования</strong>{' '}
					<br />и <strong>Политикой конфиденциальности</strong> сервиса
				</div>
			</div>
		</div>
	);
};

export default Auth;
