import Link from "next/link";



export default function PaginationBar(){
    return(
        <div className="items-center inline-flex">
            <div>
                <Link href="/product/1">1</Link>
            </div>
            <div>
                <Link href="/product/2">2</Link>
            </div>
            <div>
                <Link href="/product/3">3</Link>
            </div>
        </div>
    )
}