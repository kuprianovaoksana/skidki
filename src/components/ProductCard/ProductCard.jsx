import React from "react";
import cn from "classnames";
import s from './style.module.scss';
import Button from "../ui/Button/Button";
import exampleProduct from '../../assets/images/example_product.png'


function ProductCard({className, productValues, isCardBig, btnName}) {
	
	return (
		<div className={cn(s.productCard, {[s.productCard_bigView]: isCardBig})}>
			<div className={s.productCard__photo}>
				<img src={productValues.image || exampleProduct} alt="" />
			</div>
			<h3 className={s.productCard__title}>{productValues.title}</h3>
			{isCardBig &&
			<>
				<div className={cn(s.productCard__likes, 'icon_favorite_filled')}>
					{productValues.click_rate}
				</div>
				<div className={cn(s.productCard__pricemove, 'icon_arrow_price_after')}>
					{productValues.old_price}
				</div>
				<div className={s.productCard__date}>
					{productValues.completed_at}
				</div>
			</>}
			<div className={cn(s.productCard__price, {[s.productCard__price_end]: isCardBig})}>
				{productValues.current_price}
			</div>
			<div className={cn(s.productCard__oldPrice, {[s.productCard__oldPrice_end]: isCardBig})}>
				{productValues.old_price}
			</div>
			<Button className={s.productCard__button} children={btnName} />
		</div>
	);
};

export default ProductCard;
