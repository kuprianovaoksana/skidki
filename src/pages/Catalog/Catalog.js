import React from "react";
import cn from "classnames";
import s from './catalog.module.scss'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getWantedProductRequest } from "../../store/actions/productAction";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import ProductTrackSettings from "../../components/ProductTrackSettings/ProductTrackSettings";
import Reviews from "../../components/Reviews/Reviews";
import { Goods } from "../../components/Goods/Goods";
import Category from "../Category/Category";

function Catalog() {
	const dispatch = useDispatch();
	const { product } = useSelector(state => state.product);

	const {register, handleSubmit} = useForm({ mode: 'all' });

	const onSubmit = (data, e) => {
		e.preventDefault();
		console.log(data);

		dispatch(getWantedProductRequest(data));
	}

	return (
		<div className={s.catalog}>
            <h2 className={s.catalog__title}>Каталог</h2>
            
		</div>
	);
};

export default Catalog;
