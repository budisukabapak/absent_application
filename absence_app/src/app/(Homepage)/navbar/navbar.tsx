import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex flex-row gap-x-4 items-center justify-between px-10 py-4 shadow-lg"> 
            <h1 className="font-bold">Absence App</h1>
            <div className="flex flex-row gap-x-4">
                <Link className="animation duration-200 hover:opacity-50 italic" href={"/admin"} > Admin </Link>
                <Link className="animation duration-200 hover:opacity-50 italic" href={"/employee"} > Employee </Link>
            </div>
        </div>
    )
}