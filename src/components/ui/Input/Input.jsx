
import s from './style.module.scss';
import cn from 'classnames';
import React from 'react';

export default function Input (props) {
	const [inputValue, setInputValue] = React.useState(props.defaultValue || '');
	const [typeInput, setTypeInput] = React.useState(props.type)
	const inputRef = React.useRef();
	let idNumber = Math.random();

	const handleChange = (e) => {
		if(props.type === 'number'){
			setInputValue(e.target.value.replace(/\D/g, ""));
		} else {
			setInputValue(e.target.value);
		}
		props.onChange(e);
	}

	const showPassword = (e) => {
		e.preventDefault();
		setTypeInput(typeInput === 'password' ? 'text' : 'password');
	}

    return (
        <div className={cn(s.field, props.className)}>
			{props.labelBefore &&
			<label className={cn(s.field__label)}
				htmlFor={`input${idNumber}`}>
					{props.labelBefore}
			</label>}
				<div className={cn(s.field__box, {['icon_search1_after']: props.isSearch})}>
					<input className={s.field__input}
						id={`input${idNumber}`}
						tabIndex={props.tabIndex}
						type={typeInput || 'text'}
						min={props.min}
						max={props.max}
						name={props.nameField || props.name}
						placeholder={props.placeholder}
						autoComplete={props.autoComplete || 'off'}
						disabled={props.isDisabled}
						onChange={handleChange}
						onKeyDown={props.onKeyDown}
						pattern={props.pattern}
						{...(props.nameField ? {} : {value: props.value || inputValue})}
						defaultValue={props.defaultValue}
						// {...(props.nameField ? {props.defaultValue: props.defaultValue} : {})}
						{...(props.nameField ? {} : {ref: inputRef})}
						{...props.register ? {...props.register(props.nameField, props.validation)} : ''} />
					{props.type === 'password' &&
						<button className={cn(s.field__password, 'icon_eye_password', {[s.field__password_show]: typeInput === 'text'} )}
							type={'button'}
							onClick={showPassword} >
							<img src="" alt="" />
						</button>
					}
				</div>
			{props.labelAfter &&
			<label className={cn(s.field__label)}
				htmlFor={`input${idNumber}`}>
					{props.labelAfter}
			</label>}
        </div>
    )
}
