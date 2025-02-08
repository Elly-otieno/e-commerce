import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router";
import NullData from "../../components/general/NullData";
import AddProduct from "../../components/general/AddProduct";

const AddProducts = () => {
    const { user } = useAuth();

    if (!user) {
      return <Navigate to="/login" replace />; 
    }
  
    if (!user.isAdmin) {
      return <NullData title={`Oops! Access Denied. You are not an admin.`}/>; 
    }

    return ( 
        <div>
            <AddProduct />
        </div>
     );
}
 
export default AddProducts;