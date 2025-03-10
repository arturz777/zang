//client/src/routes.js
import Admin from "./pages/Admin";
import { ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, TERMS_ROUTE, PRIVACY_ROUTE, RETURN_ROUTE, SHIPPING_ROUTE, COOKIE_ROUTE } from "./utils/consts";
import Basket from "./pages/Basket";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import DevicePage from "./pages/DevicePage";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ReturnPolicy from "./pages/ReturnPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import CookiePolicy from "./pages/CookiePolicy";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },

    {
        path: TERMS_ROUTE,
        Component: TermsOfService
    },

    {
        path: PRIVACY_ROUTE,
        Component: PrivacyPolicy
    },

    {
        path: RETURN_ROUTE,
        Component: ReturnPolicy
    },

    {
        path: SHIPPING_ROUTE,
        Component: ShippingPolicy
    },

    {
        path: COOKIE_ROUTE,
        Component: CookiePolicy
    }

]