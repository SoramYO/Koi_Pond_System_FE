import { createBrowserRouter } from "react-router-dom";
import BlogDetail from "../components/BlogDetail";
import BlogList from "../components/BlogList";
import AdminLayout from "../layout/AdminLayout";
import CustomerLayout from "../layout/CustomerLayout";
import Services from "../pages//servicesDisplay";
import AboutUs from "../pages/AboutUs";
import CreateBlog from "../pages/Admin/CreateBlog ";
import Dashboard from "../pages/Admin/Dashboard";
import ManagerUser from "../pages/Admin/ManagerUser";
import ChangePassword from "../pages/changePassword";
import ChatWindow from "../pages/Chat/ChatWindow";
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
        path: "/blog",
        element: <BlogList />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/blog/:id",
        element: <BlogDetail />,
        ErrorPage: <ErrorPage />,
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
      {
        path: "create-blog",
        element: <CreateBlog />,
      },
      {
        path: "create-blog",
        element: <CreateBlog />,
      },
    ],
  },
  {
    path: "/chatwindow",
    element: <ChatWindow />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/staff",
    element: <StaffPage />,
    errorElement: <ErrorPage />,
  },
]);
