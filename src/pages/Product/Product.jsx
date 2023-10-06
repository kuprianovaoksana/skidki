import React from "react";
import cn from "classnames";
import s from './style.module.scss'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getWantedProductRequest } from "../../store/actions/productAction";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import ProductTrackSettings from "../../components/ProductTrackSettings/ProductTrackSettings";
import Reviews from "../../components/Reviews/Reviews";
import { Goods } from "../../components/Goods/Goods";

function Product() {
	const dispatch = useDispatch();
	const { product } = useSelector(state => state.product);

	const {register, handleSubmit} = useForm({ mode: 'all' });

	const onSubmit = (data, e) => {
		e.preventDefault();
		console.log(data);

		dispatch(getWantedProductRequest(data));
	}

	return (
		<div className={s.product}>
			<div className={cn(s.product__path, s.pathLink)}>
				<div className={cn(s.pathLink, 'icon_arrow_filled_after')}>Каталог</div>
				<div className={s.pathLink}>{product.shop}</div>
				<div className={s.pathLink}>{product.category}</div>
			</div>
			<div className={s.product__info}>
				<ProductDetail />
				<ProductTrackSettings />
			</div>
			<Reviews />
			<Goods />
		</div>
	);
};

export default Product;
