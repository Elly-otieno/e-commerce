interface ButtonProps{
    label: string,
    disabled?:boolean,
    outline?: boolean,
    small?: boolean,
    custom?: string,
    // icon?: React.ReactNode,
    onclick: any;
}

const Button: React.FC<ButtonProps> = ({
    label,
    disabled,
    outline,
    small,
    custom,
    // icon: Icon ,
    onclick
}) => {
    return ( 
    <button 
        disabled={disabled} 
        className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 border-slate-800 flex items-center gap-2 justify-center transition w-full
        ${outline ? 'bg-white text-sky-700' : 'bg-slate-700 text-white'}
        ${small ? 'text-sm font-light py-1 px-2 border-[1px]' : 'text-md font-semibold py-3 px-4 border-2'}
        ${custom ? custom : null}`}
        onClick={onclick}
        >
        {/* {Icon && <Icon size={24}/>} */}
        {label}
    </button> );
}
 
export default Button;