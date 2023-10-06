import React from "react";
import cn from "classnames";
import s from './mydiscount.module.scss'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getWantedProductRequest } from "../../store/actions/productAction";
import ProductCard from "../../components/ProductCard/ProductCard";
import FilterBlock from "../../components/FilterBlock/FilterBlock";
import ProductView from "../../components/ProductView/ProductView";
import SortingBlock from "../../components/SortingBlock/SortingBlock";
import Button from "../../components/ui/Button/Button";
import { getGoodsRequest } from "../../store/actions/goodsAction";

function MyDiscount() {
    const [btnView, setBtnView] = React.useState(true)
	const { goodsView, userGoods } = useSelector(state => state.goods);
    const { userId } = useSelector(state => state.user);
	const dispatch = useDispatch();

	React.useEffect(() => {
		console.log(goodsView)
        dispatch(getGoodsRequest('?userId'))
	},[goodsView]);

    const handleClick = (btnState) => {
        setBtnView(btnState)
    }


	return (
		<div className={s.userDiscount}>
			<div className={cn(s.userDiscount__buttons)}>
                <Button className={cn(btnView ? s.userDiscount__btn_active : s.userDiscount__btn)}
                    children={'Отслеживаю'}
                    onClick={() => handleClick(true)} />
                <Button className={cn(!btnView ? s.userDiscount__btn_active : s.userDiscount__btn)}
                    children={'Архив'}
                    onClick={() => handleClick(false)} />
			</div>
            <div className={s.userDiscount__sort}>
                <SortingBlock />
                <ProductView />
            </div>
            <div className={s.userDiscount__goods}>
                {userGoods.length > 0 &&
                userGoods.map((item) => (
                    <ProductCard productValues={item}
                        isCardBig={goodsView === 'list' ? true : false} />
                ))}
            </div>
		</div>
	);
};

export default MyDiscount;
