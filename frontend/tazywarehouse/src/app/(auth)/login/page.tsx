"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEventHandler } from "react"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    // Эмулируем работу next-auth через localStorage
    const users = JSON.parse(localStorage.getItem("tazywarehouse_users") || "[]");
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("tazywarehouse_current_user", email);
      // Можно эмулировать signIn, но без API просто редиректим
      router.push("/profile");
    } else {
      alert("Неверный email или пароль");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md p-8 bg-white drop-shadow-2xl">
        <label className="text-center text-xl font-bold">Авторизация</label>
        <input name="email" placeholder="Введите email" type="email" className="p-2 border rounded" required />
        <input name="password" placeholder="Введите пароль" type="password" className="p-2 border rounded" required />
        <div>
          У вас нет аккаунта?{" "}
          <Link href="/register" className="text-[#5138DF]">Зарегистрируйтесь</Link>
        </div>
        <button type="submit" className="bg-[#5138DF] text-white p-2 rounded hover:bg-[#3a2a9c] transition">
          Войти
        </button>
      </form>
    </div>
  );
}
