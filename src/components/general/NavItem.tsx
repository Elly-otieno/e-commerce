interface NavItemProps {
    selected?: boolean;
    icon: any;
    label: string;
}

const NavItem: React.FC<NavItemProps> = ({
    selected,
    icon: Icon,
    label,
}) => {
    return ( 
        <div className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-300 cursor-pointer transition
            ${selected ? 'border-b-slate-800 text-slate-800' : 'border-transparent text-slate-500'}`}>
                <Icon size={20}/>
                <div className="font-medium text-sm text-center break-normal">{label}</div>
            </div>
     );
}
 
export default NavItem;