import './App.scss';
import {Routes, Route} from 'react-router-dom';
import {Layout} from '../pages/Homepage/Layout/Layout';
import {Homepage} from '../pages/Homepage/Homepage/Homepage';
import {NotFound} from '../pages/NotFound/NotFound';
import Catalog from '../pages/Catalog/Catalog';
import MyDiscount from '../pages/MyDiscount/MyDiscount';
import {Notifications} from '../pages/Notifications/Notifications';
import {Settings} from '../pages/Settings/Settings';
import Product from '../pages/Product/Product';
import Category from '../pages/Category/Category';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Homepage/>}/>
          <Route path='/catalog' element={<Catalog/>}/>
          <Route path='/category' element={<Category/>}/>
          <Route path='/choosed_product' element={<Product/>}/>
          <Route path='/discount' element={<MyDiscount/>}/>
          <Route path='/notifications' element={<Notifications/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
