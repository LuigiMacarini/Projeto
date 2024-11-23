import NavAdmin from '@/components/NavAdmin'
import MenuUsers from '@/components/MenuUsers';
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react';
import Axios from 'axios';

export default function createEvent() {

  const API_URL = "http://localhost:8080/api/events";  // URL da API para criar eventos

  const [evento, setEvent] = useState({
    description: "",
    comments: "",
    date: ""
  });

  const [message, setMessage] = useState({ message: "", status: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEvent({
      ...evento,
      [name]: value
    });
  };

  const handleCreateEvent = async () => {
    try {
      const response = await Axios.post(API_URL, evento);
      setMessage({ message: "Evento salvo com sucesso! ", status: "ok" });
    } catch (error) {
      console.error('Erro ao criar o Evento:', error);
      setMessage({ message: "Erro ao criar o Evento! ", status: "error" });
    }
  };

  const getCurrentDatetime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Formata para "YYYY-MM-DDTHH:MM"
  };

  return (
    <>
      <Head>
        <title>Cadastro de Evento</title>
        <meta name="description" content="Cadastro de Evento" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <NavAdmin />
        <MenuUsers />
        {message.status === "" ? "" :
          message.status === "ok" ?
            <div className='alert alert-success' role='alert'>
              {message.message}
              <Link className='alert-link' href='/admin/events'>Voltar</Link>
            </div> :
            <div className='alert alert-danger' role='alert'>
              {message.message}
              <Link className='alert-link' href='/admin/events'>Voltar</Link>
            </div>
        }
      </div>

      <div className="d-flex justify-content-center p-2">
        <div className="container">
          <div className="row border-bottom">
            <h3> Cadastro de Evento </h3>

            <form method="POST">
              <div className="form-group">
                <label className="form-label" htmlFor="description">Descrição</label>
                <input type="text" id="description" name="description" className="form-control" value={evento.description} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="comments">Comentário</label>
                <input type="text" id="comments" name="comments" className="form-control" value={evento.comments} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="date">Data</label>
                <input type="datetime-local" id="date" name="date" className="form-control" value={evento.date} min={getCurrentDatetime()} onChange={handleChange} />
              </div>
              <div className="form-group p-2">
                <button className="btn btn-outline-success" type="button" onClick={handleCreateEvent}>Salvar</button>
                <Link className="btn btn-outline-info" href="/admin/events">Voltar</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
