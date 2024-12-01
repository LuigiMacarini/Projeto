import Link from "next/link";
import Home from "@/styles/Home.module.css"; 

export default function NavHome() {
    return (
        <nav className={Home.containerHome}>
            
            <div>
                
                <h1 className={Home.font}>Projeto Base de Conhecimentos</h1>
            </div>
            <div className="form-group">
                <Link className={Home.buttonHome} href="/login">Login</Link>
            </div>

        </nav>
    )
}