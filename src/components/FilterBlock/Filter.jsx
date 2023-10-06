import React from "react";
import cn from "classnames";
import s from './style.module.scss';
import Input from "../ui/Input/Input";
import CheckboxGroup from "../ui/Checkbox/Checkbox";

function Filter({params}) {
	const [inputValue, setInputValue] = React.useState('');
	const [more, showMore] = React.useState(false);

	return (
		<div className={s.filter}>
			<div className={s.filter__title}>{params.title}</div>
			{params.title !== 'Цена'
			? <>
				<Input className={cn(s.filter__search)}
					isSearch={true}
					onChange={(e) => setInputValue(e.target.value)}
					value={inputValue}
					placeholder={'Поиск значений'} />
				<CheckboxGroup className={cn(s.filter__checkbox)}
					options={params.optionList.filter((item) => (
						item.label.toLowerCase().includes(inputValue.toLowerCase())))}
					style={more ? {maxHeight: 'fit-content'} : {'maxHeight': '125px'}}
					onChange={params.onChange}
					/>
				<div className={s.filter__showMore}
					onClick={() => showMore(!more)}>{more ? 'Показать меньше' : 'Показать ещё'}</div>
			</>
			: <div className={s.filter__fields}>
				<Input className={s.filter__input}
					onChange={params.onChangeFrom}
					type={'number'}
					/>
				<div className={s.filter__line}></div>
				<Input className={s.filter__input}
					onChange={params.onChangeTo}
					type={'number'}
					/>
			</div>}
		</div>
	);
};

export default Filter;
