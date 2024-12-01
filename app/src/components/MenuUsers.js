import Link from "next/link";

export default function MenuUsers() {
    return (

      <div className="d-flex flex-wrap justify-content-start">
      <div className="p-2"><Link className="navbar-brand" href="/admin">Admin</Link></div>
     
      <div className="p-2"><Link className="nav-link" href="/admin/users/create">Novo Usuário</Link></div>
      <div className="p-2"><Link className="nav-link" href="/admin/students">Estudantes</Link></div>
      <div className="p-2"><Link className="nav-link" href="/admin/students/create">Novo Estudante</Link></div>
      <div className="p-2"><Link className="nav-link" href="/admin/teachers">Professores</Link></div>
      <div className="p-2"><Link className="nav-link" href="/admin/teachers/create">Novo Professor</Link></div>
      <div className="p-2"><Link className="nav-link" href="/admin/events">Eventos</Link></div>
      <div className="p-2"><Link className="nav-link" href="/admin/events/create">Novo Evento</Link></div>
      <div className="p-2"><Link className="nav-link" href="/admin/professionals">Profissionais</Link></div>
      <div className="p-2"><Link className="nav-link" href="/admin/professionals/create">Novo Profissional</Link></div>
      <div className="p-2"><Link className="nav-link" href="/admin/appointments">Agendamentos</Link></div>
      <div className="p-2"><Link className="nav-link" href="/admin/appointments/create">Novo Agendamento</Link></div>
    </div>
 
 

    )
}