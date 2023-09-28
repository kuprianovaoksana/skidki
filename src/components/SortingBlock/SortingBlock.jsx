import React from "react";
import cn from "classnames";
import s from './style.module.scss';
import RadioButton from "../ui/Radio/RadioButton";
import { sortType } from "../../data/constans";

function SortingBlock() {

	return (
		<div className={s.sortingBlock}>
			<RadioButton options={sortType} />
		</div>
	);
};

export default SortingBlock;
