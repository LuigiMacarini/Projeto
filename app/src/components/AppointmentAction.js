import Link from "next/link";
import Home from "@/styles/Home.module.css"; 

export default function AppointmentAction(props) {
    return (
        <>
            <Link className={Home['btn-visualizar']} href={`/admin/appointments/read/${props.pid}`}>Visualizar</Link>
            <Link className={Home['btn-editar']} href={`/admin/appointments/update/${props.pid}`}>Editar</Link>
            <Link className={Home['btn-deletar']} href={`/admin/appointments/delete/${props.pid}`}>Deletar</Link>
        </>
    );
}
