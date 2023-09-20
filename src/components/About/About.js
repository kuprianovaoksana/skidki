import css from './about.module.scss'

const About = () => {
    return(
        <div className={css.about}>
            <div>
                <h1>О сервисе</h1>
                <p><b>Скидкоман</b> - удобный инструмент для поиска скидок на выбранные товары. Наш сервис найдет скидки и акции, предлагаемые различными магазинами и брендами.</p>
            </div>
            <div><img src="/images/racoon.png" alt="Енот приветствует вас"/></div>
        </div>
    );
}

export {About};