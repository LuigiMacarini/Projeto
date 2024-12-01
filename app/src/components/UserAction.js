import Link from "next/link";
import styles from "@/styles/Home.module.css"; 

export default function UserAction(props) {
    return (
        <>
            <Link className={styles['btn-visualizar']} href={`/admin/users/read/${props.pid}`}>Visualizar</Link>
            <Link className={styles['btn-editar']} href={`/admin/users/update/${props.pid}`}>Editar</Link>
            <Link className={styles['btn-deletar']} href={`/admin/users/delete/${props.pid}`}>Deletar</Link>
        </>
    );
}
