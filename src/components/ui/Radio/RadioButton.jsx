import './customRadio.scss';
import s from '../Input/style.module.scss';
import cn from 'classnames';
import React from 'react';
import { ConfigProvider, Radio } from 'antd';

export default function RadioButton({className, options, defaultValue, valueName, labelName, onChange}) {
	const [value, setValue] = React.useState(defaultValue);

	const handleChange = (e) => {
		setValue(e.target.value);
		onChange && onChange(e);
	};

	return(
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#ECEFF5',
				},
			}}>
			<Radio.Group defaultValue={value}
				buttonStyle={'outline'}
				onChange={handleChange}>
				{options.map((item, idx) => (
					<Radio.Button key={idx}
						value={item[valueName || 'value']}>{item[labelName || 'label']}</Radio.Button>
				))}
			</Radio.Group>
		</ConfigProvider>
	)
}
