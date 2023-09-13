import {Goods} from '../../../components/Goods/Goods';
import {Reviews} from '../../../components/Reviews/Reviews';


const Homepage = () => {
    return (
        <main>
            <div>О сервисе</div>
            <div>Как это работает</div>
            <Goods/>
            <Reviews/>
            {/* <Goods/> */}
        </main>
    );
}

export {Homepage};