import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import CustomerLayout from "../layout/CustomerLayout";
import AccountProfile from "../pages/MainPage/AccountProfile";
import CreateBlog from "../pages/Admin/ManagerBlog/CreateBlog ";
import Dashboard from "../pages/Admin/Dashboard";
import ManagerBlog from "../pages/Admin/ManagerBlog/ManagerBlog";
import PondForm from "../pages/Admin/ManagerPond/PondForm";
import ManagerUser from "../pages/Admin/ManagerUser/ManagerUser";
import UserForm from "../pages/Admin/ManagerUser/UserForm";
import ChangePassword from "../pages/changePassword";
import ErrorPage from "../pages/errorPage";
import HomePage from "../pages/MainPage/homePage";
import Login from "../pages/Authenticate/login";
import CreateDirection from "../pages/Admin/CreateDirection";
import Earth from "../pages/Elements/Earth";
import Fire from "../pages/Elements/Fire";
import Water from "../pages/Elements/Water";
import Wood from "../pages/Elements/Wood";
import Register from "../pages/Authenticate/Register";
import ProtectedRoute from "./../config/ProtectedRoute";
import ManagerPond from "./../pages/Admin/ManagerPond/ManagerPond";
import BlogDetail from "./../pages/Blog/BlogDetail";
import Metal from "./../pages/Elements/Metal";
import FengShui from "../pages/MainPage/FengShui";
import Introduction from "../pages/MainPage/Introduction";
import BlogList from './../pages/Blog/BlogList';
import ManagerKoiFish from "../pages/Admin/ManagerKoiFish/ManagerKoiFish";
import FishForm from "../pages/Admin/ManagerKoiFish/FishForm";
import Billing from "../pages/Payment/Billing";
import EditBlog from "../pages/Admin/ManagerBlog/EditBlog";
import Consultation from "../pages/MainPage/Consultation";
import ManagerConsultation from "../pages/Admin/ManagerConsultation/ManagerConsultation";
import ChatPanel from "../components/ChatPanel";
import PackageList from "../pages/Package/Package";
import SuccessPage from "../pages/Payment/SuccessPage";
import CancelPage from "../pages/Payment/CancelPage";
import PackageDetail from "../pages/Package/PackageDetail";
import ManagerPackage from "../pages/Admin/ManagerPackage/ManagerPackage";
import PackageForm from "../pages/Admin/ManagerPackage/PackageForm";
import UserConsultation from "../pages/MainPage/UserConsultation";
import CustomerChatPanel from "../components/CustomerChatPanel";
import CreateBlogUser from "../pages/Blog/CreateBlogUser";
import EditBlogUser from "../pages/Blog/EditBlogUser";
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
        path: "/package",
        element: <PackageList />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/success",
        element: <SuccessPage />,
        errorElement: <ErrorPage />
      }
      ,
      {
        path: "/cancel",
        element: <CancelPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/package/:id",
        element: <PackageDetail />,
        errorElement: <ErrorPage />,
      }
      ,
      {
        path: "/feng-shui",
        element: <FengShui />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/consultation",
        element: (
          <ProtectedRoute requiredRoles={["User"]}>
            <Consultation />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "/contact",
        element: (
          <ProtectedRoute requiredRoles={["User"]}>
            <UserConsultation />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "/contact/:id",
        element: (
          <ProtectedRoute requiredRoles={["User"]}>
            <CustomerChatPanel />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "/create-blog",
        element: (
          <ProtectedRoute requiredRoles={["User"]}>
            <CreateBlogUser />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "/edit-blog/:id",
        element: (
          <ProtectedRoute requiredRoles={["User"]}>
            <EditBlogUser />
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
      { path: "/introduction", element: <Introduction />, errorElement: <ErrorPage /> },
      {
        path: "/elements/metal",
        element: <Metal />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/profile",
        element: <AccountProfile />,
        errorElement: <ErrorPage />,
      },
      {
        path: "billing",
        element: <Billing />,
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
        element: <EditBlog />,
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
      {
        path: "manage-consultation",
        element: <ManagerConsultation />,
      },
      {
        path: "consultation/:id",
        element: <ChatPanel />,
      },
      {
        path: "packages",
        element: <ManagerPackage />,
      },
      {
        path: "add-package",
        element: <PackageForm />,
      }
      ,
      {
        path: "edit-package/:id",
        element: <PackageForm />,
      },
    ],
  },
]);
