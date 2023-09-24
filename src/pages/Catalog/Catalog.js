import React from "react";
import cn from "classnames";
import s from './catalog.module.scss'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getWantedProductRequest } from "../../store/actions/productAction";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import ProductTrackSettings from "../../components/ProductTrackSettings/ProductTrackSettings";
import Reviews from "../../components/Reviews/Reviews";
import { Goods } from "../../components/Goods/Goods";
import Category from "../Category/Category";
import PopupWindow from "../../components/ui/PopupWindow/PopupWindow";

function Catalog() {
	const dispatch = useDispatch();
	const { windowInfo } = useSelector(state => state.statePopupWindow);

	return (
		<div className={s.catalog}>
			{windowInfo &&
				<PopupWindow className={s.catalog__noProduct}
					isPopupAbsolute={false}
					children={'Упс!  К сожалению, в данный момент мы не можем отследить данный товар. Но мы прилагаем максимум усилий, чтобы исправить эту ситуацию. А пока мы предлагаем вам поискать аналоги в нашем каталоге.'} />}
            <h2 className={s.catalog__title}>Каталог</h2>
			{/* Временно добавлен компонент Category, пока не будут реализованы разделы на бэке */}
			<Category />
		</div>
	);
};

export default Catalog;
