import NavAdmin from '@/components/NavAdmin'
import MenuUsers from '@/components/MenuUsers';
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';

export default function deleteStudent() {
  
  const API_URL = "http://localhost:8080/api/students/id/";

  const [student, setStudent] = useState({
    name: "",
    parents: "",
    phone_number: "",
    special_needs: "",
    status: "",
    age: "",
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

  // Carregar os dados do estudante
  useEffect(() => {
    if (!pid) return;  // Evitar requisição se o pid não estiver disponível

    const getStudent = async () => {
      try {
        const response = await Axios.get(API_URL + pid);
        setMessage({ message: "Estudante carregado com sucesso! ", status: "ok" });
        setStudent(response.data); // Atualiza o estado com os dados do estudante
      } catch (error) {
        console.error('Erro ao buscar o estudante:', error);
        setMessage({ message: "Erro ao buscar o Estudante! ", status: "error" });
      }
    };

    getStudent();

  }, [pid]);

  // Função para deletar o estudante
  const handleDeleteStudent = async () => {
    if (isDeleted) return; // Evita chamada de deleção se o estudante já foi deletado

    try {
      const response = await Axios.delete(API_URL + pid);
      setMessage({ message: "Estudante deletado com sucesso! ", status: "ok" });
      setIsDeleted(true); // Marca o estudante como deletado
    } catch (error) {
      console.error('Erro ao deletar o Estudante:', error);
      setMessage({ message: "Erro ao deletar o Estudante! ", status: "error" });
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
            <h3> Deletar Estudante </h3>
            
            <form>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Nome</label>
                <input type="text" id="name" name="name" className="form-control" value={student.name} readOnly />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="age">Idade</label>
                <input type="text" id="age" name="age" className="form-control" value={student.age} readOnly />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="parents">Pais</label>
                <input type="text" id="parents" name="parents" className="form-control" value={student.parents} readOnly />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone_number">Telefone</label>
                <input type="text" id="phone_number" name="phone_number" className="form-control" value={student.phone_number} readOnly />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="special_needs">Necessidades Especiais</label>
                <input type="text" id="special_needs" name="special_needs" className="form-control" value={student.special_needs} readOnly />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="status">Status</label>
                <select className="form-select" id="status" name="status" value={student.status ? "true" : "false"} readOnly>
                  {optionsStatus.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="created_at">Data de Criação</label>
                <input type="text" id="created_at" name="created_at" className="form-control" value={student.created_at} readOnly />
              </div>

              <div className="form-group p-2">
                <button 
                  className="btn btn-outline-danger" 
                  type="button" 
                  onClick={handleDeleteStudent} 
                  disabled={isDeleted} // Desabilita o botão após deleção
                >
                    Deletar
                </button>
                <Link className="btn btn-outline-info" href="/admin/students">Voltar</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
