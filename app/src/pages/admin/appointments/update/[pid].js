import NavAdmin from '@/components/NavAdmin'
import MenuUsers from '@/components/MenuUsers';
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';

export default function readAppointment() {
  const API_URL = "http://localhost:8080/api/appointments/id/"; // Rota para agendamentos

  const [appointment, setAppointment] = useState({
    specialty: "",
    comments: "",
    date: "",
    student: "",
    professional: ""
  });

  const router = useRouter();
  const { pid } = router.query;  // Obtenção do ID (pid) diretamente da URL

  const [message, setMessage] = useState({ message: "", status: "" });

  useEffect(() => {
    if (!pid) return;  // Evitar requisição se o pid não estiver disponível

    const getAppointment = async () => {
      try {
        const response = await Axios.get(API_URL + pid);
        console.log(response.data); // Certifique-se de que os dados são retornados corretamente
        setAppointment(response.data); // Atualiza o estado com os dados do agendamento
        setMessage({ message: "Agendamento encontrado com sucesso! ", status: "ok" });  // Mensagem fixa de sucesso na busca
      } catch (error) {
        console.error('Erro ao buscar o agendamento:', error);
        setMessage({ message: "Erro ao buscar o Agendamento! ", status: "error" });
      }
    };

    getAppointment();

  }, [pid]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAppointment({
      ...appointment,
      [name]: value
    });
  };

  const handleUpdateAppointment = async () => {
    try {
      console.log("Dados enviados para atualização:", appointment);  // Log para verificação
  
      const response = await Axios.put(API_URL + pid, appointment); // Enviando dados corretamente
      console.log("Resposta do servidor:", response.data);
  
      setMessage({ message: "Agendamento atualizado com sucesso! ", status: "ok" });  // Mensagem fixa de sucesso na atualização
    } catch (error) {
      console.error("Erro ao alterar o Agendamento:", error.response ? error.response.data : error.message);
      setMessage({ message: "Erro ao alterar o Agendamento! ", status: "error" });
    }
  };

  const getCurrentDatetime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Formata para "YYYY-MM-DDTHH:MM"
  };

  const formatDateTime = (date) => {
    const dateObject = new Date(date); // Cria um objeto Date a partir do valor
  
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Meses começam do zero, então somamos 1
    const day = String(dateObject.getDate()).padStart(2, '0'); // Garantir que o dia tenha 2 dígitos
    const hours = String(dateObject.getHours()).padStart(2, '0'); // Garantir que as horas tenham 2 dígitos
    const minutes = String(dateObject.getMinutes()).padStart(2, '0'); // Garantir que os minutos tenham 2 dígitos
  
    return `${year}-${month}-${day}T${hours}:${minutes}`; // Formato esperado pelo datetime-local
  };
  
  return (
    <>
      <Head>
        <title>APP-BC</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <NavAdmin />
        <MenuUsers />
        {
          message.status === "" ? "" :
            <div className={`alert ${message.status === "ok" ? 'alert-success' : 'alert-danger'}`} role='alert'>
              {message.message}
              <Link className='alert-link' href='/admin/appointments'> Voltar</Link>
            </div>
        }
      </div>

      <div className="d-flex justify-content-center p-2">
        <div className="container">
          <div className="row border-bottom">
            <h3> Edição de Agendamento </h3>

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
                <input type="datetime-local" id="date" name="date" className="form-control" value={formatDateTime(appointment.date)} min={getCurrentDatetime()} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="professional">Profissional</label>
                <input type="text" id="professional" name="professional" className="form-control" value={appointment.professional} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="student">Estudante</label>
                <input type="text" id="student" name="student" className="form-control" value={appointment.student} onChange={handleChange} />
              </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="created_at">Data de Criação</label>
                    <input type="text" id="created_at" name="created_at" className="form-control" value={appointment.created_at} readOnly />
                </div>

                <div className="form-group p-2">
                    <button className="btn btn-outline-success" type="button" onClick={handleUpdateAppointment}>Salvar</button>
                    <Link className="btn btn-outline-info" href="/admin/appointments">Voltar</Link>
                </div>
                </form>
          </div>
        </div>
      </div>
    </>
  )
}
