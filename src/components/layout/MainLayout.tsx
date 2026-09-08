import { Outlet } from "react-router-dom";
import Navbar from "../navigation/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-(--color-background) text-(--color-text-primary)">
      <Navbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
