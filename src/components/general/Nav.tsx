import { Link, useLocation } from "react-router";
import NavItem from "./NavItem";
import { ArrowUpDown, ClipboardPlus, FolderKanban, TableOfContents } from "lucide-react";

const Nav = () => {
    const location = useLocation();
    return ( 
        <div className="w-full shadow-sm top-20  pt-4">
            <div>
                <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
                    <Link to={'/dashboard'}>
                        <NavItem label="Summary" icon={TableOfContents} selected={location.pathname === '/admin'}/>
                    </Link>
                    <Link to={'/dashboard/manage-products'}>
                        <NavItem label="ManageProducts" icon={FolderKanban} selected={location.pathname === '/admin/manage-products'}/>
                    </Link>
                    <Link to={'/dashboard/manage-orders'}>
                        <NavItem label="ManageOrders" icon={ArrowUpDown} selected={location.pathname === '/admin/manage-orders'}/>
                    </Link>
                    <Link to={'/dashboard/add-products'}>
                        <NavItem label="AddProducts" icon={ClipboardPlus} selected={location.pathname === '/admin/add-products'}/>
                    </Link>
                </div>
            </div>
        </div>
     );
}
 
export default Nav;