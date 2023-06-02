import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import { Provider } from "react-redux";
import NotFound from "./pages/NotFound";
import Posts from "./pages/Posts";
import AboutMe from "./pages/AboutMe";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./pages/Profile";
import store from "./store";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        {
          path: "/",
          element: <Posts />,
        },
        {
          path: "aboutme",
          element: <AboutMe />,
        },
        {
          path: "profile/:userId",
          loader: ({ params }) => {
            return params;
          },
          element: <Profile />,
        },
      ],
    },
  ]);

  return (
    <main>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </main>
  );
}

export default App;
