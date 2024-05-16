import { BigAvatar } from './BigAvatar'
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function Appbar()
{
    
    return <AppbarSub/>
}

function AppbarSub()

{
    const navigate = useNavigate();
    return <div className="w-full shadow-gray-900 shadow-md  text-white p-5  flex justify-between">
    <div className="font-semibold text-3xl">
        Paytm
    </div>
    <div className="flex justify-between items-center text-md font-bold">
        <a onClick={()=>{navigate('/signup')}} className='py-1 px-3 bg-slate-950 transition 0.3s ease-in-out rounded-lg hover:bg-white cursor-pointer hover:text-black '>SignUp</a>
        <a onClick={()=>{navigate('/signin')}} className='py-1 px-3 bg-slate-950 transition 0.3s ease-in-out rounded-lg hover:bg-white hover:text-black mx-3 cursor-pointer'>SignIn</a>
<Link to={'/profile'}>
        <BigAvatar text={"U"}/>
</Link>
    </div>
</div>
}