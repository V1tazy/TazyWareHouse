import Link from "next/link"



export default function Header(){
    return(
        <header className="bg-[#5138DF] text-white justify-between">
            <Link href='/'>Складской учет</Link>

            <div>
                <Link href='/login'>Войти</Link>
                <Link href ='/register'>Зарегистироваться</Link>
            </div>
        </header>
    )
}