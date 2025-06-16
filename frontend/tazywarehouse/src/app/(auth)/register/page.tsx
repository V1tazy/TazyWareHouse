"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEventHandler } from "react"

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    // Эмулируем регистрацию через localStorage
    const users = JSON.parse(localStorage.getItem("tazywarehouse_users") || "[]");
    if (users.some((u: any) => u.email === email)) {
      alert("Пользователь с таким email уже существует");
      return;
    }
    users.push({ email, password });
    localStorage.setItem("tazywarehouse_users", JSON.stringify(users));
    localStorage.setItem("tazywarehouse_current_user", email);
    router.push("/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md p-8 bg-white drop-shadow-2xl">
        <label className="text-center text-xl font-bold">Регистрация</label>
        <input name="email" placeholder="Введите email" type="email" className="p-2 border rounded" required />
        <input name="password" placeholder="Введите пароль" type="password" className="p-2 border rounded" required />
        <div>
          Уже есть аккаунт?{" "}
          <Link href="/login" className="text-[#5138DF]">Войти</Link>
        </div>
        <button type="submit" className="bg-[#5138DF] text-white p-2 rounded hover:bg-[#3a2a9c] transition">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
