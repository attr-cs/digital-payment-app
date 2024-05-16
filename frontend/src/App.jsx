import {BrowserRouter, Route,Routes} from 'react-router-dom';
import {DashBoard} from './pages/Dashboard';
import { Send } from './pages/Send';
import './App.css'
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { Profile } from './pages/Profile';
import { PaymentDone } from './pages/PaymentDone';
import { PaymentFail } from './pages/PaymntFail';

function App()
{
  return <>
    <BrowserRouter>
    
      <Routes>
        <Route path='/signup'  element={<Signup/>}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/' element={<DashBoard/>}></Route>
        <Route path='/dashboard' element={<DashBoard/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/send' element={<Send/>}></Route>
        <Route path='/payment-done' element={<PaymentDone/>}></Route>
        <Route path='/payment-failed' element={<PaymentFail/>}></Route>
      </Routes>
    </BrowserRouter>
  </>
}

export default App;