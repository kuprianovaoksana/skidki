import s from './Form.module.scss';

import Input from '../Input/Input';
import { Link } from 'react-router-dom';
const Form = ({ style, inputStyle }) => {
	return (
		<form className={style}>
			<div className={s.container}>
				<label className={s.label} htmlFor="">
					Электронная почта
				</label>
				<Input style={inputStyle} placeholder="name@gmail.com" type="mail" />
			</div>
			<div className={s.container}>
				<label className={s.label} htmlFor="">
					Введите пароль
				</label>

				<Input
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

export default Form;
