import NavAdmin from '@/components/NavAdmin'
import MenuUsers from '@/components/MenuUsers';
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react';
import Axios from 'axios';
import styles from "@/styles/Home.module.css";

export default function createAppointments() {

  const API_URL = "http://localhost:8080/api/appointments";  // URL da API para criar agendamento

  const [appointment, setAppointment] = useState({
    specialty: "",
    comments: "",
    date: "",
    student: "",
    professional: ""
  });

  const [message, setMessage] = useState({ message: "", status: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAppointment({
      ...appointment,
      [name]: value
    });
  };

  const getCurrentDatetime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Formata para "YYYY-MM-DDTHH:MM"
  };

  const handleCreateAppointment = async () => {
    try {
      const response = await Axios.post(API_URL, appointment);
      setMessage({ message: "Agendamento salvo com sucesso! ", status: "ok" });
    } catch (error) {
      console.error('Erro ao criar o Agendamento:', error);
      setMessage({ message: "Erro ao criar o Agendamento! ", status: "error" });
    }
  };

  return (
    <>
      <Head>
        <title>Cadastro de Agendamento</title>
        <meta name="description" content="Cadastro de Agendamento" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <NavAdmin />
        <MenuUsers />
        {message.status === "" ? "" :
          message.status === "ok" ?
            <div className='alert alert-success' role='alert'>
              {message.message}
              <Link className='alert-link' href='/admin/appointments'>Voltar</Link>
            </div> :
            <div className='alert alert-danger' role='alert'>
              {message.message}
              <Link className='alert-link' href='/admin/appointments'>Voltar</Link>
            </div>
        }
      </div>

      <div className="d-flex justify-content-center p-2">
        <div className="container">
          <div className="row border-bottom">
            <h3> Cadastro de Agendamentos </h3>

            <form method="POST">
                <div className="form-group">
                    <label className="form-label" htmlFor="specialty">Especialidade</label>
                    <input type="text" id="specialty" name="specialty" className="form-control" value={appointment.specialty} onChange={handleChange} />
                </div>
              <div className="form-group">
                <label className="form-label" htmlFor="comments">Comentarios</label>
                <input type="text" id="comments" name="comments" className="form-control" value={appointment.comments} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="date">Data</label>
                <input type="datetime-local" id="date" name="date" className="form-control" value={appointment.date} min={getCurrentDatetime()} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="professional">Profissional</label>
                <input type="text" id="professional" name="professional" className="form-control" value={appointment.professional} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="student">Estudante</label>
                <input type="text" id="student" name="student" className="form-control" value={appointment.student} onChange={handleChange} />
              </div>
              <div className="form-group p-2">
                <button className={styles.btnUpdates} type="button" onClick={handleCreateAppointment}>Salvar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
