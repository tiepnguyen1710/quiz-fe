import { Outlet } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';

const App = () => {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();
  return (
    <div className='app-container'>
      <div className='header-container'>
        <Header></Header>
      </div>
      <div className='main-container'>
        <div className='sidenav-container'>

        </div>
        <div className='app-content'>
          <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default App;
