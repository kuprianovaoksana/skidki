import css from './footer.module.scss';
import {NavLink} from "react-router-dom";


const Footer = () => {
    return (
        <footer className={css.footer}>
            <div>
                <div className={css.imgCont}><img src="/images/logo.png" alt="Логотип сервиса скидкоман" width="372px"/></div>
                <nav className={css.navigation}>
                    <NavLink to='/' className={css.NavLink}>Главная</NavLink>
                    <NavLink to='/discount' className={css.NavLink}>Мои скидки</NavLink>
                    <NavLink to='/catalog' className={css.NavLink}>Каталог</NavLink>
                    <NavLink to='/notifications' className={css.NavLink}>Уведомления</NavLink>
                    <NavLink to='/settings' className={css.NavLink}>Настройки</NavLink>
                </nav>
            </div>
            <div className={css.footer_right_container}>
                <div><p class="mail">skidkoman@gmail.com</p></div>
                <div className={css.agreement}>
                    <a href="/agreement.html" target="_blank">Согласие на обработку персональных данных</a>
                    <a href="/policy.html" target="_blank">Политика в отношении обработки персональных данных</a>
                </div> 
            </div>
        </footer>
    );
}

export {Footer}