import React from "react";
import cn from "classnames";
import s from './style.module.scss';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getWantedProductRequest } from "../../store/actions/searchAction";
import Button from "../ui/Button/Button";
import CustomLink from "../ui/Link/Link";

function ProductDetail() {

	const { product } = useSelector(state => state.product);

	const dispatch = useDispatch();
	const {register, handleSubmit} = useForm({ mode: 'all' });

	const onSubmit = (data, e) => {
		e.preventDefault();
		console.log(data);

		dispatch(getWantedProductRequest(data));
	}

	return (
		<div className={s.productDetail}>
			<div className={s.productDetail__photo}>
				<img src={product.image} alt="" />
			</div>
			<h3 className={s.productDetail__title}>{product.title}</h3>
			<div className={s.productDetail__price}></div>
			<div className={s.productDetail__additionalInfo}>
				<div className={s.productDetail__pricemove}></div>
				<div className={s.productDetail__likes}></div>
			</div>

			<div className={s.productDetail__priceChart}>

			</div>
			<div className={s.productDetail__description}></div>
			<CustomLink className={s.productDetail__linkButton}
				children={'В магазин'} />
		</div>
	);
};

export default ProductDetail;
