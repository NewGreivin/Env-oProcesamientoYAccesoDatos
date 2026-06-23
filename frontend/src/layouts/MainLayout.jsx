import { Outlet } from "react-router-dom";
import Navbar from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function MainLayout() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar />
      <main className="container flex-grow-1 py-2">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;