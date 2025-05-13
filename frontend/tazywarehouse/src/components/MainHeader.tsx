import { Navigation } from "./Navigation"



const mainNavLink = [
    { label: "Главная" , href: "/"},
    { label: "О нас", href: "/about"},
    { label: "Тарифы", href: "/price"}
]


const MainHeader = () => {
    return(
        <div className="bg-[#5138DF] text-white flex justify-center items-center py-4">
            <Navigation navLinks={mainNavLink}></Navigation>
        </div>
    )
}

export default MainHeader