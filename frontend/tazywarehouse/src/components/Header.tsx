import { Navigation } from "../components/Navigation";

const navItems = [
  { label: 'Главная', href: "/" },
  { label: "Продукты", href: "/product" },
  { label: "Профиль", href: "/profile" }
];

const Header = () => {
  return (
    <header className="bg-[#5138DF] text-white flex justify-center items-center py-4">
      <div className="container flex justify-between items-center px-4">
        <Navigation navLinks={navItems} />
      </div>
    </header>
  );
};

export default Header;