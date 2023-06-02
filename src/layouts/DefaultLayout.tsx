import { Outlet } from "react-router-dom";
import Header from "../components/Header";
const DefaultLayout = () => {
  return (
    <div className="flex h-screen flex-1">
      <Header />
      <div className="h-full w-2/3 flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
