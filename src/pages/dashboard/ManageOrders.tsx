import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router";
import NullData from "../../components/general/NullData";
import ManageOrder from "../../components/general/ManageOrder";

const ManageOrders = () => {
    const { user } = useAuth();

    if (!user) {
      return <Navigate to="/login" replace />; 
    }
  
    if (!user.isAdmin) {
      return <NullData title={`Oops! Access Denied. You are not an admin.`}/>; 
    }

    return ( 
        <>
            <ManageOrder />
        </>
     );
}
 
export default ManageOrders;