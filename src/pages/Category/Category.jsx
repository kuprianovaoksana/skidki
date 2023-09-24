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
import Button from "../../components/ui/Button/Button";
import PopupWindow from "../../components/ui/PopupWindow/PopupWindow";

function Category() {
	const { goodsView, goodsCategory, allGoods } = useSelector(state => state.goods);
	const dispatch = useDispatch();

	React.useEffect(() => {
		console.log(goodsView)
	},[goodsView]);


	return (
		<div className={s.category} id={'up'}>
			{/* Временно закоментированно, пока не будут добавлены разделы на бэке */}
			{/* <div className={cn(s.category__path, s.pathLink)}>
				<div className={cn(s.pathLink, 'icon_arrow_filled_after')}>Каталог</div>
				<div className={s.pathLink}>{goodsCategory}</div>
			</div> */}
			<div className={s.category__container}>
				<FilterBlock />
				<div className={s.category__goods}>
					<div className={s.category__sort}>
						<SortingBlock />
						<ProductView />
					</div>
					{allGoods.map((item) => (
						<ProductCard productValues={item}
							isCardBig={goodsView === 'list' ? true : false} />
					))}
				</div>
			</div>
			<a className={cn(s.category__up, 'icon_arrow_big_after')} href='#up' children={'Наверх'} />
		</div>
	);
};

export default Category;
