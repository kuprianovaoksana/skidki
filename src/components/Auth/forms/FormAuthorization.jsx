import React from "react";
import s from './style.module.scss';
import Input from '../../ui/Input/Input';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Button from "../../ui/Button/Button";
const FormAuthorization = ({}) => {
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
				placeholder={'Минимум 5 символов'}
				labelBefore={'Введите пароль'}
				nameField={'name'}
				setValue={setValue}
				register={register}
				type={'password'} />
			<Link className={s.form__link} to="#">
				Забыли пароль
			</Link>
			<Button className={s.form__btnSubmit} type="submit">Войти</Button>
		</form>
	);
};

export default FormAuthorization;
