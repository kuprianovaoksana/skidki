import React from "react";
import cn from "classnames";
import s from './style.module.scss';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getWantedProductRequest } from "../../store/actions/productAction";
import Input from "../ui/Input/Input";
import { Slider } from "antd";
import CustomSelect from "../ui/CustomSelect/CustomSelect";
import Range from "../ui/Range/Range";
import { notificationPlace, notificationType } from "../../data/constans";

const formatter = (value) => value === 1
							? `${value} неделя` : value < 5
							? `${value} недели` : `${value} недель`;

function ProductTrackSettings() {
	const productPrice = 1000
	const [price, setPrice] = React.useState(productPrice)
	const { product } = useSelector(state => state.product);

	const dispatch = useDispatch();
	const {register, setValue, handleSubmit, watch} = useForm({ mode: 'all',
		defaultValues: {
			email_notification: true,
			lk_notification: false,
			notification_type: 0,
			endpoint: product.url,
			price: product.price,
			discount: 0,
			period_date: 1,
		},
	});

	const [ discountWatch, waitTimeWatch ] = watch(['discount', 'period_date']);

	React.useEffect(() => {

		// register fields
		register('email_notification');
		register('lk_notification');
		register('endpoint');
		register('price');
		register('period_date');

			return () => {

			}
	}, []);

	// React.useEffect(() => {

	// }, [discountWatch]);

	const onSubmit = (data, e) => {
		e.preventDefault();
		console.log(data);


	}

	return (
		<div className={s.trackSettings}>
			<div></div>
			<h3 className={s.trackSettings__title}>Настройки ожидания</h3>
			<form className={cn(s.trackSettings__form, s.form)}
				onSubmit={handleSubmit(onSubmit)}>
				<div className={s.form__range}>
					<label className={s.form__label}>Ожидаемая скидка</label>
					<Range formatterAfter={'%'}
						min={0} max={90}
						onChange={(value) => {
							setPrice(productPrice - (productPrice * value / 100))
							setValue('discount', value)}} />
				</div>
				<div className={s.form__range}>
				<label className={s.form__label}>Сколько вы готовы ждать</label>
					<Range formatter={formatter}
						min={1} max={12}
						fieldName={'period_date'}
						onChange={(value) => setValue('period_date', value)} />
				</div>
				<div className={s.form__price}>
					<label className={s.form__label}>Новая цена</label>
					<div className={s.form__price}>{price}</div>

				</div>
				<div className={s.form__select}>
					<label className={s.form__label}>Об изменениях</label>
					<CustomSelect className={s.form__select}
						optionList={notificationType}
						defaultValue={notificationType[0]}
						selectValue={'value'} selectLabel={'label'}
						onChange={(e) => setValue('notification_type', e.value)} />
				</div>
				<div className={s.form__select}>
					<label className={s.form__label}>Получать уведомления</label>
					<CustomSelect className={s.form__select}
						optionList={notificationPlace}
						defaultValue={notificationPlace[0]}
						selectValue={'value'} selectLabel={'label'}
						onChange={(e) => setValue('notification_type', e.value)} />
				</div>
				<button className={s.form__btnSubmit_light} type="submit">
					Сохранить изменения
				</button>
				<button className={s.form__btnSubmit} type="submit">
					Убрать
				</button>
			</form>
		</div>
	);
};

export default ProductTrackSettings;
