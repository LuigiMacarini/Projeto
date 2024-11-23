import NavAdmin from '@/components/NavAdmin'
import MenuUsers from '@/components/MenuUsers';
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react';
import Axios from 'axios';

export default function createStudent() {

  const API_URL = "http://localhost:8080/api/students";  // URL da API para criar estudante

  const [student, setStudent] = useState({
    name: "",
    age: "",
    parents: "",
    phone_number: "",
    special_needs: "",
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
    setStudent({
      ...student,
      [name]: value
    });
  };

  const handleCreateStudent = async () => {
    try {
      const response = await Axios.post(API_URL, student);
      setMessage({ message: "Estudante salvo com sucesso! ", status: "ok" });
    } catch (error) {
      console.error('Erro ao criar o Estudante:', error);
      setMessage({ message: "Erro ao criar o Estudante! ", status: "error" });
    }
  };

  return (
    <>
      <Head>
        <title>Cadastro de Estudante</title>
        <meta name="description" content="Cadastro de Estudantes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <NavAdmin />
        <MenuUsers />
        {message.status === "" ? "" :
          message.status === "ok" ?
            <div className='alert alert-success' role='alert'>
              {message.message}
              <Link className='alert-link' href='/admin/students'>Voltar</Link>
            </div> :
            <div className='alert alert-danger' role='alert'>
              {message.message}
              <Link className='alert-link' href='/admin/students'>Voltar</Link>
            </div>
        }
      </div>

      <div className="d-flex justify-content-center p-2">
        <div className="container">
          <div className="row border-bottom">
            <h3> Cadastro de Estudante </h3>

            <form method="POST">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Nome</label>
                <input type="text" id="name" name="name" className="form-control" value={student.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="age">Idade</label>
                <input type="text" id="age" name="age" className="form-control" value={student.age} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="parents">Pais</label>
                <input type="text" id="parents" name="parents" className="form-control" value={student.parents} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone_number">Telefone</label>
                <input type="text" id="phone_number" name="phone_number" className="form-control" value={student.phone_number} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="special_needs">Necessidades Especiais</label>
                <input type="text" id="special_needs" name="special_needs" className="form-control" value={student.special_needs} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="status">Status</label>
                <select className="form-select" id="status" name="status" value={student.status} onChange={handleChange}>
                  {optionsStatus.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group p-2">
                <button className="btn btn-outline-success" type="button" onClick={handleCreateStudent}>Salvar</button>
                <Link className="btn btn-outline-info" href="/admin/students">Voltar</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
