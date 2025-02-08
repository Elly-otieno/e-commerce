const PATHS = {
    landing: "/",
    products: {
        index: "/products",
        product: "/products/:id"
    },
    login: "/login",
    cart: "/cart",
    dashboard: {
        index: "/dashboard",
        addProducts: "/dashboard/add-products",
        manageProducts: "/dashboard/manage-products",
        manageOrders: "/dashboard/manage-orders",
    },
    error: '*'
}

export default PATHS;