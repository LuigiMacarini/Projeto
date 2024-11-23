import NavAdmin from '@/components/NavAdmin'
import MenuUsers from '@/components/MenuUsers';
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';

export default function deleteTeacher() {
  
  const API_URL = "http://localhost:8080/api/teachers/id/";

  const [teacher, setTeacher] = useState({
    name: "",
    school_disciplines: "",
    contact: "",
    phone_number: "",
    status: "",
    created_at: ""
  });

  const router = useRouter();
  const [pid] = useState(router.query.pid); // Obtenção do ID (pid) diretamente da URL

  const [message, setMessage] = useState({ message: "", status: "" });
  const [isDeleted, setIsDeleted] = useState(false); // Novo estado para controlar a deleção

  const optionsStatus = [
    { value: '', text: '-- Selecione um estado --' },
    { value: 'true', text: 'Ativo' },
    { value: 'false', text: 'Inativo' },
  ];

  // Carregar os dados do professor
  useEffect(() => {
    if (!pid) return;  // Evitar requisição se o pid não estiver disponível

    const getTeacher = async () => {
      try {
        const response = await Axios.get(API_URL + pid);
        setMessage({ message: "Professor carregado com sucesso! ", status: "ok" });
        setTeacher(response.data); // Atualiza o estado com os dados do professor
      } catch (error) {
        console.error('Erro ao buscar o professor:', error);
        setMessage({ message: "Erro ao buscar o Professor! ", status: "error" });
      }
    };

    getTeacher();

  }, [pid]);

  // Função para deletar o professor
  const handleDeleteTeacher = async () => {
    if (isDeleted) return; // Evita chamada de deleção se o professor já foi deletado

    try {
      const response = await Axios.delete(API_URL + pid);
      setMessage({ message: "Professor deletado com sucesso! ", status: "ok" });
      setIsDeleted(true); // Marca o professor como deletado
    } catch (error) {
      console.error('Erro ao deletar o Professor:', error);
      setMessage({ message: "Erro ao deletar o Professor! ", status: "error" });
    }
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
            message.status === "ok" ? 
              <div className='alert alert-success' role='alert'>
                {message.message}
                <Link className='alert-link' href='/admin/teachers'>Voltar</Link>
              </div> : 
              <div className='alert alert-danger' role='alert'>
                {message.message}
                <Link className='alert-link' href='/admin/teachers'>Voltar</Link>
              </div>
        }
      </div>

      <div className="d-flex justify-content-center p-2">
        <div className="container">
          <div className="row border-bottom">
            <h3> Deletar Professor </h3>

            <form>
                <div className="form-group">
                    <label className="form-label" htmlFor="name">Nome</label>
                    <input type="text" id="name" name="name" className="form-control" value={teacher.name} readOnly />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="school_disciplines">Matérias escolares</label>
                    <input type="text" id="school_disciplines" name="school_disciplines" className="form-control" value={teacher.school_disciplines} readOnly />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="contact">Pais</label>
                    <input type="text" id="contact" name="contact" className="form-control" value={teacher.contact} readOnly />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="phone_number">Telefone</label>
                    <input type="text" id="phone_number" name="phone_number" className="form-control" value={teacher.phone_number} readOnly />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="status">Status</label>
                    <select className="form-select" id="status" name="status" value={teacher.status ? "true" : "false"} readOnly>
                    {optionsStatus.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="created_at">Data de Criação</label>
                    <input type="text" id="created_at" name="created_at" className="form-control" value={teacher.created_at} readOnly />
                </div>

              <div className="form-group p-2">
                <button 
                  className="btn btn-outline-danger" 
                  type="button" 
                  onClick={handleDeleteTeacher} 
                  disabled={isDeleted} // Desabilita o botão após deleção
                >
                    Deletar
                </button>
                <Link className="btn btn-outline-info" href="/admin/teachers">Voltar</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
