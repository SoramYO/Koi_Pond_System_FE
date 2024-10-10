import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import CustomerLayout from "../layout/CustomerLayout";
import Services from "../pages//servicesDisplay";
import AboutUs from "../pages/AboutUs";
import Dashboard from "../pages/Admin/Dashboard";
import ManagerUser from "../pages/Admin/ManagerUser";
import ChangePassword from "../pages/changePassword";
import ChatFirebaseLogin from "../pages/Chat/ChatFirebaseLogin";
import ChatWindow from "../pages/Chat/ChatWindow";
import ErrorPage from "../pages/errorPage";
import HomePage from "../pages/homePage";
import Login from "../pages/login";
import Register from "../pages/Register";
import StaffPage from "../pages/Staff/StaffPage";
import BlogPage from "../pages/BlogPage";
import CreateBlog from "../pages/Admin/CreateBlog ";
import BlogList from "../components/BlogList";
import BlogDetail from "../components/BlogDetail";
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
        ErrorPage: <ErrorPage />
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
  {
    path: "/chatfirebaselogin",
    element: <ChatFirebaseLogin />,
    errorElement: <ErrorPage />,
  },
]);
