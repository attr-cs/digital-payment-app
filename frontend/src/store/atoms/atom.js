import {atom, selector} from 'recoil';
import axios from 'axios';

export const balanceAtom = atom({
    key: 'balanceAtom',
    default: selector({
        key: 'balanceSelector',
        get: async({get})=>{
            const res = await fetch('http://localhost:3000/api/v1/account/balance',{method:'GET',headers:{authorization:`Bearer ${localStorage.token}`}});
            const data = await res.json();
            return data.balance;
        }
    })
})

export const isSignedAtom = atom({
    key:'signedin',
    default:false
})

// Frontend filtering but not recommended if users in billions
// export const usersAtom = atom({
//     key: 'usersAtom',
//     default: selector({
//         key: 'usersSelector',
//         get: async ({get})=>{
//             const res = await axios.get('http://localhost:3000/api/v1/user/bulk');
//             return res.data.user;
//         }
//     })
// })

// export const filterInput = atom({
//     key: 'filterInput',
//     default: ""
// })

// export const filterUsers = atom({
//     key: 'filterAtom',
//     default: selector({
//         key: 'filterSelector',
//         get: ({get})=>{
//             const users = get(usersAtom);
//             const input = get(filterInput);
//             return users.filter(user=>{
//                 if(user.firstname.toLowerCase().includes(input) || user.lastname.toLowerCase().includes(input))
//                 {
//                     return user;
//                 } 
//             })
//         }
//     })
// })