import React from "react";
import cn from "classnames";
import s from './style.module.scss';
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button/Button";
import { selectBrand, selectCategory, selectPriceFrom, selectPriceTo, selectShop } from "../../store/slices/filters";
import Filter from "./Filter";
import { getBrandsRequest, getCategoriesRequest, getGoodsRequest, getShopsRequest } from "../../store/actions/goodsAction";

const transformToParams = (param, checkedParams, arrauValues) => {
	let searchString = '';
	checkedParams.map(item => {
		searchString
		? searchString += `&${param}=${arrauValues[item - 1].name}`
		: searchString = `${param}=${arrauValues[item - 1].name}`
	})
	return searchString;
};

function FilterBlock() {
	const { categories, brands, shops } = useSelector(state => state.goods);
	const { shop, category, brand, priceFrom, priceTo } = useSelector(state => state.filters);
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(getCategoriesRequest());
		dispatch(getBrandsRequest());
		dispatch(getShopsRequest());

	},[]);

	const filtersParam = [
		{
			title: 'Магазин',
			optionList: shops.map(item => ({label: item.name, value: item.id})),
			onChange: (e) => dispatch(selectShop(e))
		},
		{
			title: 'Категория',
			optionList: categories.map(item => ({label: item.name, value: item.id})),
			onChange: (e) => dispatch(selectCategory(e))
		},
		{
			title: 'Бренд',
			optionList: brands.map(item => ({label: item.name, value: item.id})),
			onChange: (e) => dispatch(selectBrand(e))
		},
		{
			title: 'Цена',
			onChangeFrom: (e) => dispatch(selectPriceFrom(e.target.value)),
			onChangeTo: (e) => dispatch(selectPriceTo(e.target.value))
		},
	]

	const applyFilters = (e) => {
		e.preventDefault();
		let searchParams = '';
		const shopParams = transformToParams('shop', shop, shops );
		const categoryParams = transformToParams('category', category, categories );
		const brandParams = transformToParams('brand', brand, brands);

		searchParams = shopParams;
		searchParams ? searchParams += `&${categoryParams}` : searchParams = categoryParams;
		searchParams ? searchParams	+= `&${brandParams}` : searchParams = brandParams;

		dispatch(getGoodsRequest(searchParams));
	}
	const clearFilters = (e) => {
		e.preventDefault();

	}

	return (
		<div className={s.filterBlock}>
			{filtersParam.map((item, index) => (
				<Filter key={index} params={item} />
			))}
			<Button className={s.filterBlock__btnApply}
				children={'Применить'}
				onClick={applyFilters} />
			<Button className={s.filterBlock__btnClear}
				children={'Очистить'}
				onClick={clearFilters} />
		</div>
	);
};

export default FilterBlock;
