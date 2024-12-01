import Link from "next/link";
import styles from "@/styles/Home.module.css"; 

export default function TeacherAction(props) {
    return (
        <>
            <Link className={styles['btn-visualizar']} href={`/admin/teachers/read/${props.pid}`}>Visualizar</Link>
            <Link className={styles['btn-editar']} href={`/admin/teachers/update/${props.pid}`}>Editar</Link>
            <Link className={styles['btn-deletar']} href={`/admin/teachers/delete/${props.pid}`}>Deletar</Link>
        </>
    );
}
