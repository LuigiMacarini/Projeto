import Link from "next/link";
import styles from "@/styles/Home.module.css"; 

export default function StudentAction(props) {
    return (
        <>
            <Link className={styles['btn-visualizar']} href={`/admin/students/read/${props.pid}`}>Visualizar</Link>
            <Link className={styles['btn-editar']} href={`/admin/students/update/${props.pid}`}>Editar</Link>
            <Link className={styles['btn-deletar']} href={`/admin/students/delete/${props.pid}`}>Deletar</Link>
        </>
    );
}
