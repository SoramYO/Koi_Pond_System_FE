import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import CustomerLayout from "../layout/CustomerLayout";
import Services from "../pages//servicesDisplay";
import AboutUs from "../pages/AboutUs";
import Dashboard from "../pages/Admin/Dashboard";
import ManagerUser from "../pages/Admin/ManagerUser";
import ChangePassword from "../pages/changePassword";
import ChatModal from "../pages/Chat/ChatModal";
import ErrorPage from "../pages/errorPage";
import HomePage from "../pages/homePage";
import Login from "../pages/login";
import Register from "../pages/Register";
import StaffPage from "../pages/Staff/StaffPage";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/signup",
        element: <Register />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/forgot-password",
        element: <ChangePassword />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/services",
        element: <Services />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/about",
        element: <AboutUs />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <ManagerUser />,
      },
    ],
  },
  {
    path: "/chat",
    element: <ChatModal />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/staff",
    element: <StaffPage />,
    errorElement: <ErrorPage />,
  },
]);
