export function InputBox({label,placeholder,onChange})
{
    return <div >
        <div className="text-left font-medium py-2 text-sm">
            {label}
        </div>
        <input onChange={onChange} type="text" placeholder={placeholder} className="p-1 pl-3 border-slate-400 border-2 w-full rounded" />
    </div>
}