import {Outlet} from "react-router-dom";
import {Header} from '../Header/Header';
import {Footer} from '../Footer/Footer';
import css from "./layout.module.scss"


const Layout = () => {
    return (
        <div className={css.wrapper}> 
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}

export {Layout}