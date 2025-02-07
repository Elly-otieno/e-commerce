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
        usersList: "/dashboard/users",
    },
    error: '*'
}

export default PATHS;