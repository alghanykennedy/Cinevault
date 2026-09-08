import { Outlet } from "react-router-dom";
import Navbar from "../navigation/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#08090B] text-white">
      <Navbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
