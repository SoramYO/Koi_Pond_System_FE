import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import CustomerLayout from "../layout/CustomerLayout";
import Services from "../pages//servicesDisplay";
import AboutUs from "../pages/AboutUs";
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
import CustomPondPage from "../pages/Order/CustomPondPage";
import OrderPage from "../pages/Order/OrderPage";
import SelectPondPage from "../pages/Order/SelectPondPage";
import PondDetail from "../pages/PondDetail";
import ProjectPond from "../pages/ProjectPond";
import Register from "../pages/Register";
import StaffPage from "../pages/Staff/ConsultingStaff/StaffPage";
import StaffChat from "../pages/Staff/StaffChat";
import ProtectedRoute from "./../config/ProtectedRoute";
import StaffLayout from "./../layout/StaffLayout";
import ManagerPond from "./../pages/Admin/ManagerPond/ManagerPond";
import BlogDetail from "./../pages/Blog/BlogDetail";
import BlogList from "./../pages/Blog/BlogList";
import OrderDetailsPage from "./../pages/Staff/ConsultingStaff/OrderDetailsPage";
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
        path: "/order",
        element: (
          <ProtectedRoute requiredRoles={["Customer"]}>
            <OrderPage />
          </ProtectedRoute>
        ),
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
        path: "/projects",
        element: <ProjectPond />,
      },
      {
        path: "/about",
        element: <AboutUs />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/pond/:id",
        element: <PondDetail />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/select-pond/:id",
        element: <SelectPondPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/custom-pond/:id",
        element: <CustomPondPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRoles={["Manager"]}>
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
    ],
  },
  {
    path: "/consultingstaff",
    element: (
      <ProtectedRoute requiredRoles={["ConsultingStaff"]}>
        <StaffLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <StaffPage />,
      },
      {
        path: "chat",
        element: <StaffChat />,
      },
      {
        path: "orders/:orderId",
        element: <OrderDetailsPage />,
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
