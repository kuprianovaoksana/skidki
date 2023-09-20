import {Goods} from '../../../components/Goods/Goods';
import {Reviews} from '../../../components/Reviews/Reviews';
import {About} from '../../../components/About/About';
import {Instructions} from '../../../components/Instructions/Instructions';




const Homepage = () => {
    return (
        <main>
            <About/>
            <Instructions/>
            {/* <Goods/>
            <Reviews/> */}
            {/* <Goods/> */}
        </main>
    );
}

export {Homepage};