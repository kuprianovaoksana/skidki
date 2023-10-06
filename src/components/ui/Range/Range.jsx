import React from "react";
import './range.scss'
import cn from "classnames";
import { Slider } from "antd";

function Range({className, ...props}) {
	const formatter = (value) => (
			`${props.formatterBefore || ''}${value}${props.formatterAfter || ''}`);

	return (
		<Slider className={className}
			defaultValue={props.defaultValue || 0}
			min={props.min || 0} max={props.max || 100}
			tooltip={{
				open: props.isTooltipOpen || true,
				placement: props.placement || 'bottom',
				formatter: props.formatter ? props.formatter : formatter}}
			name={props.name}
			onChange={props.onChange}
			marks={props.marks}
			step={props.step} />
	);
};

export default Range;

