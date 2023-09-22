import React from "react";
import cn from "classnames";
import s from './style.module.scss';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getWantedProductRequest } from "../../store/actions/productAction";
import Button from "../ui/Button/Button";
import CustomLink from "../ui/Link/Link";
import exampleProduct from '../../assets/images/example_product.png'

function SortingBlock() {
	const { product } = useSelector(state => state.product);
	const dispatch = useDispatch();
	const classPriceMove = product.current_price < product.old_price
			? s.productDetail__pricemove_down : s.productDetail__pricemove;
	const priceMove = product.current_price * 100 / product.old_price;


	// const

	return (
		<div className={s.sortingBlock}>
		</div>
	);
};

export default SortingBlock;
