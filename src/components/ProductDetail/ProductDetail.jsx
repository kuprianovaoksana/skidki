import React from "react";
import cn from "classnames";
import s from './style.module.scss';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getWantedProductRequest } from "../../store/actions/productAction";
import Button from "../ui/Button/Button";
import CustomLink from "../ui/Link/Link";
import exampleProduct from '../../assets/images/example_product.png'

function ProductDetail() {
	const { product } = useSelector(state => state.product);
	const dispatch = useDispatch();
	const classPriceMove = product.current_price < product.old_price
			? s.productDetail__pricemove_down : s.productDetail__pricemove;
	const priceMove = product.current_price * 100 / product.old_price;


	// const

	return (
		<div className={s.productDetail}>
			<div className={s.productDetail__photo}>
				<img src={product.image || exampleProduct} alt="" />
			</div>
			<h3 className={s.productDetail__title}>{product.title}</h3>
			<div className={s.productDetail__price}>{product.current_price}</div>
			<div className={s.productDetail__additionalInfo}>
				<div className={cn(classPriceMove, 'icon_arrow')}>
					{`${priceMove}%` || product.old_price}
				</div>
				<div className={cn(s.productDetail__likes, 'icon_like')}>
					{product.click_rate}
				</div>
			</div>
			<div className={cn(s.productDetail__priceChart, s.priceChart)}>
				<h4 className={s.priceChart__title}>График цен</h4>
			</div>
			<div className={s.productDetail__description}>{product.description}</div>
			<CustomLink className={s.productDetail__linkButton}
				url={product.url}
				children={'В магазин'} />
		</div>
	);
};

export default ProductDetail;
