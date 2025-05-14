"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

type NavLink = {
  label: string;
  href: string;
};
type Props = {
  navLinks: NavLink[];
};

const Navigation = ({ navLinks }: Props) => {
  const pathname = usePathname();
  const session = useSession();

  console.log(session)

  return (
    <nav className="flex items-center justify-center gap-8">
      {session?.data && (
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
      
      {session?.data ? (
        <Link href="#" onClick={() => signOut({ callbackUrl: "/" })}>
          Выйти
        </Link>
      ) : (
        <Link href="/login">Войти</Link>
      )}
    </nav>
  );
};

export { Navigation };