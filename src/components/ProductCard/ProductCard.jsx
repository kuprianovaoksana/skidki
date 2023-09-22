import React from "react";
import cn from "classnames";
import s from './style.module.scss';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getWantedProductRequest } from "../../store/actions/productAction";
import Button from "../ui/Button/Button";
import CustomLink from "../ui/Link/Link";
import exampleProduct from '../../assets/images/example_product.png'


function ProductCard({className, cardView, btnName}) {
	const { product } = useSelector(state => state.product);
	const dispatch = useDispatch();
	const classPriceMove = product.current_price < product.old_price
			? s.productDetail__pricemove_down : s.productDetail__pricemove;
	const priceMove = product.current_price * 100 / product.old_price;

	return (
		<div className={cn(s.productCard, {[cardView]: s.bigView})}>
			<div className={s.productCard__photo}>
				<img src={product.image || exampleProduct} alt="" />
			</div>
			<div className={s.productCard__photo}></div>
			<h3 className={s.productCard__title}>{product.title}</h3>
			<div className={cn(s.productCard__likes, 'icon_favorite_filled')}>
				{product.click_rate}
			</div>
			<div className={cn(s.productCard__pricemove, 'icon_arrow_price_after')}>
				{`${priceMove}%` || product.old_price}
			</div>
			<div className={s.productCard__date}>
				{product.completed_at}
			</div>
			<div className={s.productCard__price}>{product.current_price}</div>
			<div className={s.productCard__oldPrice}>{product.old_price}</div>
			<Button className={s.productCard__button} children={btnName} />
		</div>
	);
};

export default ProductCard;
