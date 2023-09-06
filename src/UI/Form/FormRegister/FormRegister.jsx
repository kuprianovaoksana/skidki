import s from './FormRegister.module.scss';
import Input from '../../Input/Input';
import Icon from '../../Icon/Icon';
import { useState } from 'react';
const FormRegister = ({ style, inputStyle }) => {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};
	const passwordInputType = passwordVisible ? 'text' : 'password';

	return (
		<form autocomplete="new-password" className={style}>
			<div className={s.container}>
				<label className={s.label} htmlFor="inputMail">
					Электронная почта
				</label>
				<Input
					autocomplete="off"
					id="inputMail"
					style={inputStyle}
					placeholder="name@gmail.com"
					type="mail"
				/>
			</div>
			<div className={s.container}>
				<label className={s.label} htmlFor="inputName">
					Имя
				</label>
				<Input
					autocomplete="off"
					id="inputName"
					style={inputStyle}
					placeholder="Иван"
					type="text"
				/>
			</div>
			<div className={s.container}>
				<label className={s.label} htmlFor="inputSurname">
					Фамилия
				</label>
				<Input
					autocomplete="off"
					id="inputSurname"
					style={inputStyle}
					placeholder="Иванов"
					type="text"
				/>
			</div>
			<div className={s.container}>
				<label className={s.label} htmlFor="inputPassword">
					Придумайте пароль
				</label>
				<Input
					autocomplete="off"
					id="inputPassword"
					style={inputStyle}
					placeholder="******"
					type={passwordInputType}
				/>
				<span onClick={togglePasswordVisibility}>
					<Icon style={s.eye} iconPath={'Eye'} alt="show" />
				</span>
			</div>
			<div className={s.container}>
				<label className={s.label} htmlFor="inputRepeatPassword">
					Повторите пароль
				</label>
				<Input
					autocomplete="off"
					id="inputRepeatPassword"
					style={inputStyle}
					placeholder="******"
					type={passwordInputType}
				/>
				<span onClick={togglePasswordVisibility}>
					<Icon style={s.eye} iconPath={'Eye'} alt="show" />
				</span>
			</div>

			<div className={s.remember}>
				<input
					className={s.remember__input}
					id="inputCheckbox"
					type="checkbox"
				/>{' '}
				<label className={s.remember__label} htmlFor="inputCheckbox">
					Запомнить пароль
				</label>
			</div>
			<button className={s.btn} type="submit">
				Зарегистрироваться
			</button>
		</form>
	);
};

export default FormRegister;
