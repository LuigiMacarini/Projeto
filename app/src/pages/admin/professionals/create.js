import NavAdmin from '@/components/NavAdmin'
import MenuUsers from '@/components/MenuUsers';
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react';
import Axios from 'axios';

export default function createProfessional() {

  const API_URL = "http://localhost:8080/api/professionals";  // URL da API para criar profissional

  const [professional, setProfessional] = useState({
    name: "",
    specialty: "",
    contact: "",
    phone_number: "",
    status: "", // Booleano no dropdown
  });

  const [message, setMessage] = useState({ message: "", status: "" });

  const optionsStatus = [
    { value: '', text: '-- Selecione um estado --' },
    { value: 'true', text: 'Ativo' },
    { value: 'false', text: 'Inativo' },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfessional({
      ...professional,
      [name]: value
    });
  };

  const handleCreateProfessional = async () => {
    try {
      const response = await Axios.post(API_URL, professional);
      setMessage({ message: "Profissional salvo com sucesso! ", status: "ok" });
    } catch (error) {
      console.error('Erro ao criar o Profissional:', error);
      setMessage({ message: "Erro ao criar o Profissional! ", status: "error" });
    }
  };

  return (
    <>
      <Head>
        <title>Cadastro de Profissional</title>
        <meta name="description" content="Cadastro de Profissional" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <NavAdmin />
        <MenuUsers />
        {message.status === "" ? "" :
          message.status === "ok" ?
            <div className='alert alert-success' role='alert'>
              {message.message}
              <Link className='alert-link' href='/admin/professionals'>Voltar</Link>
            </div> :
            <div className='alert alert-danger' role='alert'>
              {message.message}
              <Link className='alert-link' href='/admin/professionals'>Voltar</Link>
            </div>
        }
      </div>

      <div className="d-flex justify-content-center p-2">
        <div className="container">
          <div className="row border-bottom">
            <h3> Cadastro de Profissional </h3>

            <form method="POST">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Nome</label>
                <input type="text" id="name" name="name" className="form-control" value={professional.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                    <label className="form-label" htmlFor="specialty">Especialidade</label>
                    <input type="text" id="specialty" name="specialty" className="form-control" value={professional.specialty} onChange={handleChange} />
                </div>
              <div className="form-group">
                    <label className="form-label" htmlFor="contact">Contato</label>
                    <input type="text" id="contact" name="contact" className="form-control" value={professional.contact} onChange={handleChange} />
                </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone_number">Telefone</label>
                <input type="text" id="phone_number" name="phone_number" className="form-control" value={professional.phone_number} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="status">Status</label>
                <select className="form-select" id="status" name="status" value={professional.status} onChange={handleChange}>
                  {optionsStatus.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group p-2">
                <button className="btn btn-outline-success" type="button" onClick={handleCreateProfessional}>Salvar</button>
                <Link className="btn btn-outline-info" href="/admin/professional">Voltar</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
