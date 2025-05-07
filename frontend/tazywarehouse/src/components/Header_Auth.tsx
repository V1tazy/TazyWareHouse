import Link from "next/link";



export default function Header_Auth(){
    return(
        <header className="bg-[#5138DF] text-white justify-between">
            <div>Складской учет</div>

            <Link href="/product">Товары</Link>
            <Link href="/equipment">Оборудование</Link>
            <Link href="/report">Отчет</Link>
            <Link href="/profile">Мой профиль</Link>
        </header>
    )
}