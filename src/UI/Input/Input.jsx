const Input = ({ style, placeholder, type }) => {
	return (
		<div>
			<input className={style} placeholder={placeholder} type={type} />
		</div>
	);
};

export default Input;
