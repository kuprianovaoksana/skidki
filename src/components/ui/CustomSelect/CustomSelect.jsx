import './customSelect.scss';
import s from '../Input/style.module.scss';
import Select from 'react-select'
import cn from 'classnames';
import React from 'react';

const styleProxy = new Proxy({}, {
	  get: () => () => {}
});

export default function CustomSelect(props) {

	return(
		<>
			{props.labelBefore &&
			<label className={cn(s.field__label)} htmlFor={props.id}>
				{props.labelBefore}
			</label>}
			<Select
				styles={styleProxy}
				classNamePrefix={cn(props.classError ? 'customSelectError' : 'customSelect')}
				className={cn(props.selectType, props.className)}
				getOptionValue={(option) => `${option[props.selectValue
											? props.selectValue : 'value']}`}
				getOptionLabel={(option) => `${option[props.selectLabel
											? props.selectLabel : 'label']}`}
				options={props.optionList}
				noOptionsMessage={() => props.noOptionsMessage || 'Упс! Пусто...'}
				defaultValue={props.defaultValue}
				onChange={props.onChange}
				value={props.value}
				hideSelectedOptions={false}
				isSearchable={props.isSearchable || false}
				placeholder={props.placeholder}
				isDisabled={props.isDisabled}
				id={props.id}
				menuIsOpen={props.menuIsOpen || false}
				{...(props.isMulti ? {isMulti: true} : {})}
				 />
			{props.labelAfter &&
			<label className={cn(s.field__label)} htmlFor={props.id}>
				{props.labelAfter}
			</label>}
		</>
	)
}
