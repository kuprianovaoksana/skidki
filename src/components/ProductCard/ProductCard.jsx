import React from "react";
import cn from "classnames";
import s from './style.module.scss';
import Button from "../ui/Button/Button";
import exampleProduct from '../../assets/images/example_product.png'


function ProductCard({className, product, isCardBig, btnName}) {
	// const classPriceMove = product.current_price < product.old_price
	// 		? s.productDetail__pricemove_down : s.productDetail__pricemove;

	return (
		<div className={cn(s.productCard, {[isCardBig]: s.productCard_bigView})}>
			<div className={s.productCard__photo}>
				<img src={product.image || exampleProduct} alt="" />
			</div>
			<h3 className={s.productCard__title}>{product.title}</h3>
			{isCardBig &&
			<>
				<div className={cn(s.productCard__likes, 'icon_favorite_filled')}>
					{product.click_rate}
				</div>
				<div className={cn(s.productCard__pricemove, 'icon_arrow_price_after')}>
					{product.old_price}
				</div>
				<div className={s.productCard__date}>
					{product.completed_at}
				</div>
			</>}
			<div className={s.productCard__price}>{product.current_price}</div>
			<div className={s.productCard__oldPrice}>{product.old_price}</div>
			<Button className={s.productCard__button} children={btnName} />
		</div>
	);
};

export default ProductCard;
