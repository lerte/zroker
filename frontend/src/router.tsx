import Layout from "./Layout";
import Index from "./views/index";
import Invite from "./views/invite";
import Enable from "./views/enable";
import Version from "./views/version";
import Sharing from "./views/sharing";
import Overview from "./views/overview";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    // parent route component
    element: <Layout />,
    // child route components
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/overview",
        element: <Overview />,
      },
      {
        path: "/invite",
        element: <Invite />,
      },
      {
        path: "/enable",
        element: <Enable />,
      },
      {
        path: "/sharing",
        element: <Sharing />,
      },
      {
        path: "/version",
        element: <Version />,
      },
    ],
  },
]);

export default router;
