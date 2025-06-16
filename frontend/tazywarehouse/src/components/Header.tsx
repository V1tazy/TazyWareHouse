import { Navigation } from "../components/Navigation";

const navItems = [
  { label: 'Главная', href: "/" },
  { label: "Оборудование", href: "/equipment" },
  { label: "Офис", href: "/office"},
  { label: "Документы", href: "/documents"}
];

const Header = () => {
  return (
    <header className="bg-[#5138DF] text-white flex justify-center items-center py-4">
      <div className="container flex justify-between items-center px-4">
        <div>Складской учёт</div>
        <Navigation navLinks={navItems} />
      </div>
    </header>
  );
};

export default Header;