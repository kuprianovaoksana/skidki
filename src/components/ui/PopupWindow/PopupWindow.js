import s from './style.module.scss';
import cn from 'classnames';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showWindowInfo } from '../../../store/slices/windowStateSlice';

export default function PopupWindow({className, children, isPopupAbsolute, showPopupWindow}) {
	const popupType = isPopupAbsolute ? s.window_absolute : s.window_relative;
	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			dispatch(showWindowInfo(false))
		}
	}, []);

	return (
		<div className={cn(s.window, popupType, className)}>
			<div className={s.window__container}>
				<button className={cn(s.window__close, 'icon_close1')}
					onClick={() => dispatch(showWindowInfo(false))}
					></button>
				<div className={s.window__children}>
					{children}
				</div>
			</div>
		</div>
	);
}
