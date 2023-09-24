import './customRadio.scss';
import s from '../Input/style.module.scss';
import Select from 'react-select'
import cn from 'classnames';
import React from 'react';
import { Checkbox, ConfigProvider, Radio } from 'antd';

const styleProxy = new Proxy({}, {
	  get: () => () => {}
});

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
				{options.map((item) => (
					<Radio.Button value={item[valueName || 'value']}>{item[labelName || 'label']}</Radio.Button>
				))}
			</Radio.Group>
		</ConfigProvider>
	)
}
