import React from "react";
import cn from "classnames";
import s from './category.module.scss'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getWantedProductRequest } from "../../store/actions/productAction";
import ProductCard from "../../components/ProductCard/ProductCard";
import FilterBlock from "../../components/FilterBlock/FilterBlock";
import ProductView from "../../components/ProductView/ProductView";
import SortingBlock from "../../components/SortingBlock/SortingBlock";

function Category() {
	const { goodsView, goodsCategory } = useSelector(state => state.goods);
	const dispatch = useDispatch();
	const {register, handleSubmit} = useForm({ mode: 'all' });

	const onSubmit = (data, e) => {
		e.preventDefault();
		console.log(data);

		dispatch(getWantedProductRequest(data));
	}

	return (
		<div className={s.category}>
			<div className={cn(s.category__path, s.pathLink)}>
				<div className={cn(s.pathLink, 'icon_arrow_filled_after')}>Каталог</div>
				<div className={s.pathLink}>{goodsCategory}</div>
			</div>
			<ProductView />
			<FilterBlock />
			<SortingBlock />
			<div></div>
			<ProductCard />
		</div>
	);
};

export default Category;
