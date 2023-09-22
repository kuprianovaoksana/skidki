import React from "react";
import cn from "classnames";
import s from './style.module.scss'
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getWantedProductRequest } from "../../store/actions/productAction";

function Reviews({title, description}) {
	const dispatch = useDispatch();
	const {register, handleSubmit} = useForm({ mode: 'all' });

	const onSubmit = (data, e) => {
		e.preventDefault();
		console.log(data);

		dispatch(getWantedProductRequest(data));
	}

	return (
		<div className={s.search}>

		</div>
	);
};

export default Reviews;
