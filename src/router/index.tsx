import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Setting from "../pages/setting";
import Home from "../pages/home";
import { PROJECT_BASE_URL } from "../constants/route";

const router = createBrowserRouter([
  {
    path: PROJECT_BASE_URL,
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
