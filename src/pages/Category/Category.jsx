import React from "react";
import cn from "classnames";
import s from './category.module.scss';
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard/ProductCard";
import FilterBlock from "../../components/FilterBlock/FilterBlock";
import ProductView from "../../components/ProductView/ProductView";
import SortingBlock from "../../components/SortingBlock/SortingBlock";
import { getGoodsRequest } from "../../store/actions/goodsAction";

function Category() {
	const { goodsView, allGoods } = useSelector(state => state.goods);
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(getGoodsRequest());

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
					<div className={cn({[s.category__goods_list]: goodsView === 'list'},
						{[s.category__goods_tile]: goodsView === 'tile'})}>
						{allGoods.map((item, idx) => (
							<ProductCard key={idx}
								productValues={item}
								btnName={'Следить'}
								isCardBig={goodsView === 'list' ? false : true} />
						))}
					</div>
				</div>
			</div>
			<a className={cn(s.category__up, 'icon_arrow_big_after')} href='#up' children={'Наверх'} />
		</div>
	);
};

export default Category;
