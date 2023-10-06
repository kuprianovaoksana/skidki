import React from "react";
import s from './style.module.scss';
import Input from '../../ui/Input/Input';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { registrationRequest } from "../../../store/actions/authorizationAction";

function FormRegister () {

	const dispatch = useDispatch();
	const {register, setValue, handleSubmit, watch} = useForm({
		mode: 'all',
		defaultValues: {
			isRemember: false,
		},
	});

	React.useEffect(() => {

	}, []);

	const onSubmit = (data, e) => {
		// e.preventDefault();
		console.log(data);
		registrationRequest(dispatch, data)

	}

	return (
		<form className={s.form}
			onSubmit={handleSubmit(onSubmit)}>
			<Input className={s.form__field}
				placeholder={"name@example.com"}
				labelBefore={'Электронная почта'}
				nameField={'email'}
				setValue={setValue}
				register={register} />
			<Input className={s.form__field}
				labelBefore={'Имя'}
				nameField={'first_name'}
				setValue={setValue}
				register={register} />
			<Input className={s.form__field}
				labelBefore={'Фамилия'}
				nameField={'last_name'}
				setValue={setValue}
				register={register} />
			<Input className={s.form__field}
				placeholder={'Минимум 5 символов'}
				labelBefore={'Придумайте пароль'}
				nameField={'password'}
				setValue={setValue}
				register={register}
				type={'password'} />
			<Input className={s.form__field}
				placeholder={'Минимум 5 символов'}
				labelBefore={'Повторите пароль'}
				nameField={'re_password'}
				setValue={setValue}
				register={register}
				type={'password'} />
			<button className={s.form__btnSubmit} type="submit">
				Зарегистрироваться
			</button>
		</form>
	);
};

export default FormRegister;
