import React from "react";
import cn from "classnames";
import s from './style.module.scss';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getWantedProductRequest } from "../../store/actions/searchAction";
import Input from "../ui/Input/Input";

function ProductTrackSettings() {
	const dispatch = useDispatch();
	const {register, handleSubmit} = useForm({ mode: 'all' });

	const onSubmit = (data, e) => {
		e.preventDefault();
		console.log(data);

		dispatch(getWantedProductRequest(data));
	}

	return (
		<div className={s.trackSettings}>
			<h3 className={s.trackSettings__title}>trackSettings</h3>
			<form className={s.search__form}
				onSubmit={handleSubmit(onSubmit)}>
					<Input
						type={'range'} />
				{/* <div className={cn(s.search__inputBox, '')}>
					<input className={s.search__input}
						placeholder={'Введите ссылку на товар'}
						{...register('search', {minLength: 1})}
						type={'text'} />
				</div> */}
				<button className={s.search__btnSubmit} type="submit">Следить</button>
			</form>

		</div>
	);
};

export default ProductTrackSettings;
