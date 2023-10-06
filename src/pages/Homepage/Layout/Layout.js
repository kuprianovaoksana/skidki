import React from "react";
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import css from './layout.module.scss';
import Auth from '../../../components/Auth/Auth';
import { useSelector } from 'react-redux';

const Layout = () => {
	const { windowAuth } = useSelector((state) => state.statePopupWindow);

	React.useEffect(() => {
	},[windowAuth]);

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
