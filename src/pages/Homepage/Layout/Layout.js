import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import css from './layout.module.scss';
import Auth from '../../../components/Auth/Auth';
import { useState } from 'react';

const Layout = () => {
	const [isShowEntry, setIsShowEntry] = useState(false);
	const showEntry = () => {
		if (isShowRegister === true) {
			setIsShowRegister(false);
		}
		setIsShowEntry(!isShowEntry);
	};

	const [isShowRegister, setIsShowRegister] = useState(false);
	const showRegister = () => {
		if (isShowEntry === true) {
			setIsShowEntry(false);
		}
		setIsShowRegister(!isShowRegister);
	};
	return (
		<div className={css.wrapper}>
			<Auth
				showEntry={showEntry}
				showRegister={showRegister}
				isShowEntry={isShowEntry}
				isShowRegister={isShowRegister}
			/>
			<Header showEntry={showEntry} showRegister={showRegister} />
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export { Layout };
