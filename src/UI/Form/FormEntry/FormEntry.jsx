import s from './FormEntry.module.scss';
import Input from '../../Input/Input';
import { Link } from 'react-router-dom';
const FormEntry = ({ style, inputStyle }) => {
	return (
		<form className={style}>
			<div className={s.container}>
				<label className={s.label} htmlFor="inputMail">
					Электронная почта
				</label>
				<Input
					id="inputMail"
					style={inputStyle}
					placeholder="name@gmail.com"
					type="mail"
				/>
			</div>
			<div className={s.container}>
				<label className={s.label} htmlFor="inputPassword">
					Введите пароль
				</label>

				<Input
					id="inputPassword"
					style={inputStyle}
					placeholder="Минимум 5 символов"
					type="password"
				/>
			</div>
			<Link className={s.link} to="#">
				Забыли пароль
			</Link>
			<button className={s.btn} type="submit">
				Войти
			</button>
		</form>
	);
};

export default FormEntry;
