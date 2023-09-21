import Search from '../../../components/Search/Search';
import css from './header.module.scss';
import {NavLink} from "react-router-dom";
// import {useNavigate} from 'react-router-dom';

const isAuth = false;

const Header = () => {
    return (
        <header className={css.header}>
            <div className={css.logo_menu}>
                <div className={css.logo}>
                    <div className={css.imgCont}><NavLink to='/'><img src="/images/logo.png" alt="Логотип сервиса скидкоман" width="372px"/></NavLink></div>
                    <NavLink to='/catalog' className={css.NavLink}>
                        <div className= {css.button}>
                            <div className={css.button_logo}>
                                <div className={css.line}></div>
                                <div className={css.line}></div>
                                <div className={css.line}></div>
                            </div>
                            <div>Каталог</div>
                        </div>
                    </NavLink>
                </div>
                <nav className={css.navigation}>
                    <NavLink to='/discount' className={css.MenuLink}>
                        <div className={css.MenuIcon}>
                            <div className={css.icon_active}><img src="/images/icons/heart-icon.svg" alt=''/></div>
                            <div className={css.icon}><img src="/images/icons/heart-icon-active.svg" alt=''/></div>
                            <div>Мои скидки</div>
                        </div>
                    </NavLink>
                    <NavLink to='/notifications' className={css.MenuLink}>
                        <div className={css.MenuIcon}>
                            <div className={css.icon_active}><img src="/images/icons/notifications-icon.svg" alt=''/></div>
                            <div className={css.icon}><img src="/images/icons/notifications-icon-active.svg" alt=''/></div>
                            <div>Уведомления</div>
                        </div>
                    </NavLink>
                    <NavLink to='/settings' className={css.MenuLink}>
                        <div className={css.MenuIcon}>
                            <div className={css.icon_active}><img src="/images/icons/settings-icon.svg" alt=''/></div>
                            <div className={css.icon}><img src="/images/icons/settings-icon-active.svg" alt=''/></div>
                            <div>Настройки</div>
                        </div>
                    </NavLink>
                    {
                        isAuth === false ?
                        <NavLink to='/entrance' className={css.MenuLink}>
                            <div className={css.MenuIcon}>
                                <div className={css.icon_active}><img src="/images/icons/entrance-icon.svg" alt=''/></div>
                                <div className={css.icon}><img src="/images/icons/entrance-icon-active.svg" alt=''/></div>
                                <div>Вход</div>
                            </div>
                        </NavLink>
                        :
                        <NavLink to='/entrance' className={css.MenuLink}>
                            <div className={css.MenuIcon}>
                                <div className={css.icon_active}><img src="/images/icons/exit-icon.svg" alt=''/></div>
                                <div className={css.icon}><img src="/images/icons/exit-icon.svg" alt=''/></div>
                                <div>Выход</div>
                            </div>
                        </NavLink>
                    }
                </nav>
            </div>
            <Search />
            {/* <div className={css.search}>
                <div>
                    <input className={css.input} placeholder="Введите ссылку на товар"/>
                    <div><img src="/images/loupe.png" alt=""/></div>
                </div>
                <button className={css.button}>Следить</button>
            </div> */}
        </header>
    );
}

export {Header}