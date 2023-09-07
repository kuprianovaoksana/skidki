import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import css from './layout.module.scss';
import Auth from '../../../components/Auth/Auth';

const Layout = () => {
	return (
		<div className={css.wrapper}>
			<Auth />
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export { Layout };
