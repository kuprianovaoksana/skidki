import React from "react";
import s from './style.module.scss';
import Input from '../../ui/Input/Input';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Button from "../../ui/Button/Button";
import CheckboxGroup from "../../ui/Checkbox/Checkbox";

const FormAuthorization = ({}) => {
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
		e.preventDefault();
		console.log(data);


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
				placeholder={'Минимум 5 символов'}
				labelBefore={'Введите пароль'}
				nameField={'password'}
				setValue={setValue}
				register={register}
				type={'password'} />
			<CheckboxGroup className={s.form__checkbox}
				options={[{label: 'Запомнить пароль', value: 'isRemember'}]}
				onChange={(e) => setValue('isRemember', e[0] ? true : false)} />
			{/* <Link className={s.form__link} to="#">
				Забыли пароль
			</Link> */}
			<Button className={s.form__btnSubmit} type="submit">Войти</Button>
		</form>
	);
};

export default FormAuthorization;
