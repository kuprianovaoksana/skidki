import FormRegister from './FormRegister/FormRegister';
import FormEntry from './FormEntry/FormEntry';
const Form = ({ type, style, inputStyle }) => {
	const showCurrentForm = () => {
		if (type === 'enter') {
			return <FormEntry style={style} inputStyle={inputStyle} />;
		} else if (type === 'register') {
			return <FormRegister style={style} inputStyle={inputStyle} />;
		}
	};
	return showCurrentForm();
};

export default Form;
