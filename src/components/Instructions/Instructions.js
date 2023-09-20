import css from './instructions.module.scss'

const Instructions = () => {
    return(
        <div className={css.instructions}>
            <h1>Как это работает</h1>
            <div className={css.cards}>
                <div>
                    <h1>Шаг 1</h1>
                    <p>Скопируйте ссылку на интересующий вас товар в любом интернет-магазине.</p>
                </div>
                <div><img src="images/step1.png" alt="Скопируйте ссылку на товар"/></div>
            </div>
            <div className={css.cards}>
                <div><img src="images/step2.png" alt="Скопируйте ссылку на товар"/></div>
                <div>
                    <h1>Шаг 2</h1>
                    <p>Вставьте скопированную ссылку в указанное полеи нажмите на кнопку “СЛЕДИТЬ“.</p>
                </div>
            </div>
            <div className={css.cards}>
                <div>
                    <h1>Шаг 3</h1>
                    <p>После этого вы получите сообщение в Телеграме о наличии скидки на товар.</p>
                </div>
                <div><img src="images/step3.png" alt="Скопируйте ссылку на товар"/></div>
            </div>
        </div>
    );
}

export {Instructions};