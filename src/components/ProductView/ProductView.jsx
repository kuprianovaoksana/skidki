import React from "react";
import cn from "classnames";
import s from './style.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { setProductCardViewList, setProductCardViewTile } from "../../store/slices/goodsSlice";

function ProductView() {
	const { goodsView } = useSelector(state => state.goods);
	const dispatch = useDispatch();
	const classStyle = goodsView === 'list' ? s.viewBtn_list : s.viewBtn_tile;

	// React.useEffect(() => {
	// 	console.log(goodsView)
	// },[goodsView]);

	const handleClick = () => {
		goodsView === 'list'
		? dispatch(setProductCardViewTile())
		: dispatch(setProductCardViewList())
	}

	return (
		<button className={cn(s.viewBtn, classStyle)}
			onClick={handleClick}
			/>
	);
};

export default ProductView;
