"use client"

import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, FormEventHandler } from "react"



export default function LoginPage(){

    const router = useRouter()


 const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      isRegister: false,
      redirect: false,
    });

    if (res && !res.error) {
      router.push("/profile");
    } else {
      console.log(res);
    }
  };

    return(
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md p-8 bg-white drop-shadow-2xl">
                <label className="text-center text-xl font-bold">Авторизация</label>

                <input name="email" placeholder="Введите email" type="email" className="p-2 border rounded" required></input>


                <input name="password" placeholder="Введите пароль" type="password" className="p-2 border rounded" required></input>

                <div>У вас нет аккаунта? <Link href="/register" className="text-[#5138DF]">Зарегистрируйте</Link></div>
                <button type="submit" className="bg-[#5138DF] text-white p-2 rounded hover:bg-[#3a2a9c] transition">Войти</button>
            </form>
        </div>
    )

};
