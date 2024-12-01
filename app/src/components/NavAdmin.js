import Link from "next/link";
import Home from "@/styles/Home.module.css";

export default function NavHome() {
    return (
        <nav className={Home.containerLogin}>
            <div>
                <h2 className={Home.font}>Sistema de Base de Conhecimentos</h2>
            </div>
            <div className="form-group">
                <Link className={Home.buttonEx} href="/">Logout</Link>
            </div>
        </nav>
    )
}