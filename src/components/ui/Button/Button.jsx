import React from "react";
import cn from "classnames";
import s from './style.module.scss';

function Button({className, children, onClick, isDisabled}) {

	return (
		<button className={cn(className)}
			onClick={onClick}
			disabled={isDisabled}>
			{children}
		</button>
	);
};

export default Button;
