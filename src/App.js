import './App.css';
import {Routes, Route} from 'react-router-dom';
import {Layout} from './pages/Homepage/Layout/Layout';
import {Homepage} from './pages/Homepage/Homepage/Homepage';
import {NotFound} from './pages/NotFound/NotFound';
import {Catalog} from './pages/Catalog/Catalog';
import {Entrance} from './pages/Entrance/Entrance';
import {MyDiscount} from './pages/MyDiscount/MyDiscount';
import {Notifications} from './pages/Notifications/Notifications';






function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Homepage/>}/>
          <Route path='/catalog' element={<Catalog/>}/>
          <Route path='/entrance' element={<Entrance/>}/>
          <Route path='/discount' element={<MyDiscount/>}/>
          <Route path='/notifications' element={<Notifications/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
