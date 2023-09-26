import React from "react";
import s from './style.module.scss';
import Input from '../../ui/Input/Input';
import Icon from '../../ui/Icon/Icon';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Checkbox } from 'antd';
import { useForm } from 'react-hook-form';
import CheckboxGroup from "../../ui/Checkbox/Checkbox";

function FormRegister ({ style, inputStyle }) {
		// const [price, setPrice] = React.useState(productPrice)
	// const { product } = useSelector(state => state.product);

	const dispatch = useDispatch();
	const {register, setValue, handleSubmit, watch} = useForm({ mode: 'all',
		defaultValues: {
			email: true,
			name: '',
			lastname: '',
			password: 0,
			password_repeat: 0,
			period_date: 1,
			remember: false,
		},
	});

	const [ discountWatch, waitTimeWatch ] = watch(['discount', 'period_date']);

	React.useEffect(() => {
		// register fields
		register('remember');

			return () => {

			}
	}, []);

	React.useEffect(() => {

	}, [discountWatch]);

	const onSubmit = (data, e) => {
		e.preventDefault();
		console.log(data);


	}

	return (
		<form className={s.form}
			onSubmit={handleSubmit(onSubmit)}>
			<Input className={s.form__field}
				placeholder={"name@example.com"}
				labelBefore={'Электронная почта'}
				nameField={'name'}
				setValue={setValue}
				register={register} />
			<Input className={s.form__field}
				labelBefore={'Имя'}
				nameField={'name'}
				setValue={setValue}
				register={register} />
			<Input className={s.form__field}
				labelBefore={'Фамилия'}
				nameField={'name'}
				setValue={setValue}
				register={register} />
			<Input className={s.form__field}
				placeholder={'Минимум 5 символов'}
				labelBefore={'Придумайте пароль'}
				nameField={'name'}
				setValue={setValue}
				register={register}
				type={'password'} />
			<Input className={s.form__field}
				placeholder={'Минимум 5 символов'}
				labelBefore={'Повторите пароль'}
				nameField={'name'}
				setValue={setValue}
				register={register}
				type={'password'} />
			<CheckboxGroup className={s.form__checkbox}
				options={[{label: 'Запомнить пароль', value: 'remember'}]}
				onChange={(e) => setValue('remember', e[0] ? true : false)} />
			<button className={s.form__btnSubmit} type="submit">
				Зарегистрироваться
			</button>
		</form>
	);
};

export default FormRegister;
