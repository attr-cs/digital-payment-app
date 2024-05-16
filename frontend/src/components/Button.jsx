export function Button({label,onClick})
{
    return <button className="w-full text-white py-1 rounded-md bg-gray-800 hover:bg-gray-900 focus:outline-none focus:" type="button" onClick={onClick}>{label}</button>
}