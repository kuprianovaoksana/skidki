const Icon = ({ style, iconPath, alt }) => {
	const iconsPath = process.env.PUBLIC_URL + '/images/icons/';
	const getIcon = (icon) => iconsPath + icon + '.svg';
	return (
		<div>
			<img className={style} src={getIcon(iconPath)} alt={alt} />
		</div>
	);
};

export default Icon;
