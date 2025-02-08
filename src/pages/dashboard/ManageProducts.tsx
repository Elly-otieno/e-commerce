import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router";
import NullData from "../../components/general/NullData";
import ManageProduct from "../../components/general/ManageProduct";

const ManageProducts = () => {
    const { user } = useAuth();

    if (!user) {
      return <Navigate to="/login" replace />; 
    }
  
    if (!user.isAdmin) {
      return <NullData title={`Oops! Access Denied. You are not an admin.`}/>; 
    }

    return ( 
        <>
            <ManageProduct />
        </>
     );
}
 
export default ManageProducts;