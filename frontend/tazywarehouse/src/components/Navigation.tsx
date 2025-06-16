"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type NavLink = {
  label: string;
  href: string;
};
type Props = {
  navLinks: NavLink[];
};

const CURRENT_USER_KEY = "tazywarehouse_current_user";

const Navigation = ({ navLinks }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(!!localStorage.getItem(CURRENT_USER_KEY));
    // Слушаем изменения localStorage (например, logout в другой вкладке)
    const handler = () => setIsAuth(!!localStorage.getItem(CURRENT_USER_KEY));
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem(CURRENT_USER_KEY);
    setIsAuth(false);
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-center gap-8">
      {isAuth && (
        <>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-white/20 text-white font-medium"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/profile">Профиль</Link>
        </>
      )}

      {isAuth ? (
        <Link href="#" onClick={handleLogout}>
          Выйти
        </Link>
      ) : (
        <Link href="/login">Войти</Link>
      )}
    </nav>
  );
};

export { Navigation };