import s from './Auth.module.scss';
// import Enter from './Enter/Enter';
import Register from './Register/Register';

const Auth = () => {
	return (
		<div className={s.container}>
			{/* <Enter  /> */}
			<Register />
		</div>
	);
};

export default Auth;
