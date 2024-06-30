import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Setting from "../pages/setting";
import Home from "../pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
    ],
  },
]);

export default router;
