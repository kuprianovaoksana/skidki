import React from "react";
import cn from "classnames";
import s from './style.module.scss'
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getWantedProductRequest } from "../../store/actions/productAction";

function Search() {
	const dispatch = useDispatch();
	const {register, handleSubmit} = useForm({ mode: 'all' });

	const onSubmit = (data, e) => {
		e.preventDefault();
		console.log(data);

		dispatch(getWantedProductRequest(data));
	}

	return (
		<div className={s.search}>
			<form className={s.search__form}
				onSubmit={handleSubmit(onSubmit)}>
				<div className={cn(s.search__inputBox, '')}>
					<input className={s.search__input}
						placeholder={'Введите ссылку на товар'}
						{...register('search', {minLength: 1})}
						type={'text'} />
				</div>
				<button className={s.search__btnSubmit} type="submit">Следить</button>
			</form>
		</div>
	);
};

export default Search;
