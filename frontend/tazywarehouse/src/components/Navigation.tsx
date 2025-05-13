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
  const { data: session } = useSession();

  console.log(session)

  return (
    <nav className="flex items-center justify-center gap-8">
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
      
      {session && (
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="px-4 py-2 text-white/80 hover:text-white ml-4 transition-colors"
        >
          Выйти
        </button>
      )}
    </nav>
  );
};

export { Navigation };