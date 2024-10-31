import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import CustomerLayout from "../layout/CustomerLayout";
import Services from "../pages//servicesDisplay";
import AccountProfile from "../pages/AccountProfile";
import CreateBlog from "../pages/Admin/CreateBlog ";
import Dashboard from "../pages/Admin/Dashboard";
import ManagerBlog from "../pages/Admin/ManagerBlog";
import PondForm from "../pages/Admin/ManagerPond/PondForm";
import ManagerUser from "../pages/Admin/ManagerUser/ManagerUser";
import UserForm from "../pages/Admin/ManagerUser/UserForm";
import ChangePassword from "../pages/changePassword";
import ChatWindow from "../pages/Chat/ChatWindow";
import ErrorPage from "../pages/errorPage";
import HomePage from "../pages/homePage";
import Login from "../pages/login";
import CreateDirection from "../pages/Admin/CreateDirection";
import Earth from "../pages/Elements/Earth";
import Fire from "../pages/Elements/Fire";
import Water from "../pages/Elements/Water";
import Wood from "../pages/Elements/Wood";
import Register from "../pages/Register";
import ProtectedRoute from "./../config/ProtectedRoute";
import ManagerPond from "./../pages/Admin/ManagerPond/ManagerPond";
import BlogDetail from "./../pages/Blog/BlogDetail";
import Metal from "./../pages/Elements/Metal";
import FengShui from "./../pages/FengShui";
import Introduction from "../pages/Introduction";
import BlogList from './../pages/Blog/BlogList';
import ManagerKoiFish from "../pages/Admin/ManagerKoiFish/ManagerKoiFish";
import FishForm from "../pages/Admin/ManagerKoiFish/FishForm";
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
        path: "/feng-shui",
        element: <FengShui />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/contact",
        element: (
          <ProtectedRoute requiredRoles={["Customer"]}>
            <ChatWindow />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "/blog",
        element: <BlogList />,
        ErrorPage: <ErrorPage />,
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
        path: "/register",
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
      { path: "/introduction", element: <Introduction />, errorElement: <ErrorPage /> },
      {
        path: "/elements/metal",
        element: <Metal />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/elements/wood",
        element: <Wood />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/elements/water",
        element: <Water />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/elements/fire",
        element: <Fire />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/elements/earth",
        element: <Earth />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/direction",
        element: <CreateDirection />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/elements/earth",
        element: <Earth />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/direction",
        element: <CreateDirection />,
        errorElement: <ErrorPage />,
      }
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRoles={["Admin"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "manage-users",
        element: <ManagerUser />,
      },
      {
        path: "add-user",
        element: <UserForm />,
      },
      {
        path: "edit-user/:id",
        element: <UserForm />,
      },
      {
        path: "create-blog",
        element: <CreateBlog />,
      },
      {
        path: "blogs",
        element: <ManagerBlog />,
      },
      {
        path: "blog/:id",
        element: <BlogDetail />,
      },
      {
        path: "edit-blog/:id",
        element: <CreateBlog />,
      },
      {
        path: "manager-pond",
        element: <ManagerPond />,
      },
      {
        path: "add-pond",
        element: <PondForm />,
      },
      {
        path: "edit-pond/:id",
        element: <PondForm />,
      },
      {
        path: "manager-fish",
        element: <ManagerKoiFish />,
      },
      {
        path: "add-koi-fish",
        element: <FishForm />,
      },
      {
        path: "edit-koi-fish/:id",
        element: <FishForm />
      },

    ],
  },
  {
    path: "/customer",
    element: (
      <ProtectedRoute requiredRoles={["Customer"]}>
        <CustomerLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "index",
        element: <HomePage />,
      },
      {
        path: "profile",
        element: <AccountProfile />,
      },
    ],
  },
]);
