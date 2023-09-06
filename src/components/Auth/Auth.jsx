import s from './Auth.module.scss';
import Enter from './Enter/Enter';

const Auth = () => {
	const iconsPath = process.env.PUBLIC_URL + '/images/icons/';
	const getIcon = (icon) => iconsPath + icon + '.svg';
	return (
		<div className={s.container}>
			<Enter getIcon={getIcon} />
		</div>
	);
};

export default Auth;
