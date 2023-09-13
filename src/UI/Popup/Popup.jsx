import s from './Popup.module.scss';
const Popup = ({ isShow, children }) => {
	return (
		<div
			className={s.container}
			style={{ display: isShow ? 'absolute' : 'none' }}
		>
			{children}
		</div>
	);
};

export default Popup;
