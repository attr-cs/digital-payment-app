import { Appbar } from "../components/Appbar";
import {Balance} from "../components/Balance";
import {RecoilRoot} from 'recoil';
import { Users } from "../components/Users";

export function DashBoard()
{
    return <div className="min-h-screen h-max bg-slate-700 ">
      <Appbar/>
      <RecoilRoot >
        <Balance />
      </RecoilRoot>
        <Users/>
    </div>
}

