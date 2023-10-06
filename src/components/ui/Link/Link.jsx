import React from "react";
import cn from "classnames";
import s from './style.module.scss';

function CustomLink({className, children, target, url}) {

	return (
		<a className={className} href={url} target={target || '_blank'}>
			{children}
		</a>
	);
};

export default CustomLink;
