import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import SupportInfo from "./SupportInfo";
import NavActions from "./NavActions";

export default function MainNavbar() {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2 md:px-6 md:py-3 lg:px-36">
      <div className="shrink-0">
        <Logo />
      </div>

      <div className="hidden min-w-0 flex-1 md:flex md:px-4">
        <SearchBar />
      </div>

      <nav
        aria-label="Main navigation"
        className="hidden shrink-0 lg:flex"
      >
        <NavLinks />
      </nav>

      <div className="hidden shrink-0 md:block">
        <SupportInfo />
      </div>

      <div className="shrink-0">
        <NavActions />
      </div>
    </div>
  );
}