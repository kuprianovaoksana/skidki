import React from "react";
import cn from "classnames";
import s from './style.module.scss';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getWantedProductRequest } from "../../store/actions/productAction";
import Button from "../ui/Button/Button";
import Input from "../ui/Input/Input";
import exampleProduct from '../../assets/images/example_product.png'
import CustomSelect from "../ui/CustomSelect/CustomSelect";
import { selectBrand, selectCategory, selectPriceFrom, selectPriceTo, selectShop } from "../../store/slices/filters";
import { notificationType, sortType } from "../../data/constans";
import Filter from "./Filter";

function FilterBlock() {
	const { shop, category, brand, priceFrom, priceTo } = useSelector(state => state.filters);
	const dispatch = useDispatch();

	React.useEffect(() => {
		console.log(shop, category, brand, priceFrom, priceTo)
	},[shop, category, brand, priceFrom, priceTo]);

	const filtersParam = [
		{
			title: 'Магазин',
			optionList: sortType,
			onChange: (e) => dispatch(selectShop(e))
		},
		{
			title: 'Категория',
			optionList: notificationType,
			onChange: (e) => dispatch(selectCategory(e))
		},
		{
			title: 'Бренд',
			optionList: notificationType,
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
