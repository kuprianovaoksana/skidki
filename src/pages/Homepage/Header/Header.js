import css from './header.module.scss';
import { NavLink } from 'react-router-dom';
// import {useNavigate} from 'react-router-dom';

const isAuth = false;

const Header = ({ showEntry, showRegister }) => {
	return (
		<header className={css.header}>
			<div className={css.logo_menu}>
				<div className={css.logo}>
					<div className={css.imgCont}>
						<NavLink to="/">
							<img
								src="/images/logo.png"
								alt="Логотип сервиса скидкоман"
								width="372px"
							/>
						</NavLink>
					</div>
					<NavLink to="/catalog" className={css.NavLink}>
						<div classname={css.button}>Каталог</div>
					</NavLink>
				</div>
				<nav className={css.navigation}>
					<NavLink to="/discount" className={css.NavLink}>
						Мои скидки
					</NavLink>
					<NavLink to="/notifications" className={css.NavLink}>
						Уведомления
					</NavLink>
					<NavLink to="/settings" className={css.NavLink}>
						Настройки
					</NavLink>
					{isAuth === false ? (
						<NavLink to="/entrance" onClick={showEntry} className={css.NavLink}>
							Вход
						</NavLink>
					) : (
						<NavLink to="/entrance" className={css.NavLink}>
							Выход
						</NavLink>
					)}
					<NavLink onClick={showRegister} to="#" className={css.NavLink}>
						Регистрация
					</NavLink>
				</nav>
			</div>
			<div className={css.search}>
				<input />
				<button>Следить</button>
			</div>
		</header>
	);
};

export { Header };
