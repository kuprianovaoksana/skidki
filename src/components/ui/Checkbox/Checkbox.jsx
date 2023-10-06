import './customCheckbox.scss';
import s from '../Input/style.module.scss';
import cn from 'classnames';
import React from 'react';
import { Checkbox } from 'antd';

export default function CheckboxGroup({className, style, options, disabled, onChange}) {

	return(
		<Checkbox.Group className={className} style={style}
			options={options}
			disabled={disabled}
			onChange={(e) => onChange(e)} />
	)
}
