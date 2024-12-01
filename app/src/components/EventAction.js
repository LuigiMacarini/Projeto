import Link from "next/link";
import styles from "@/styles/Home.module.css"; 

export default function EventAction(props) {
    return (
        <>
            <Link className={styles['btn-visualizar']} href={`/admin/events/read/${props.pid}`}>Visualizar</Link>
            <Link className={styles['btn-editar']} href={`/admin/events/update/${props.pid}`}>Editar</Link>
            <Link className={styles['btn-deletar']} href={`/admin/events/delete/${props.pid}`}>Deletar</Link> 
        </>
    )
}
