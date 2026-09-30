import TopBar from "./TopBar";
import MainNavbar from "./MainNavbar";

export default function Navbar() {
  return (
    <header>
      <div className="hidden md:block">
        <TopBar />
      </div>

      <MainNavbar />
    </header>
  );
}