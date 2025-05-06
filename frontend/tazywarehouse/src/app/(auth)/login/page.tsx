


export default function LoginPage(){
    return(
        <div className="min-h-screen flex items-center justify-center">
            <form className="flex flex-col gap-4 w-full max-w-md p-8 bg-white drop-shadow-2xl">
                <label className="text-center text-xl font-bold">Авторизация</label>

                <input placeholder="Введите логин" className="p-2 border rounded" required></input>


                <input placeholder="Введите пароль" className="p-2 border rounded" required></input>

                <button type="submit" className="bg-[#5138DF] text-white p-2 rounded hover:bg-[#3a2a9c] transition">Зарегистрироваться</button>
            </form>
        </div>
    )
}