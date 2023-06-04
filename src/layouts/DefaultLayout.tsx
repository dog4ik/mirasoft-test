import { Outlet } from "react-router-dom";
import Header from "../components/Header";
const DefaultLayout = () => {
  return (
    <div className="100vh">
      <Header />
      <main className="pt-3" style={{ height: "calc(100vh - 56px)" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
