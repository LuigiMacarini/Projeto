import NavAdmin from '@/components/NavAdmin'
import MenuUsers from '@/components/MenuUsers';
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';

export default function updateuser() {
  
  const API_URL = "http://localhost:8080/api/users/id/"

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    username: "",
    password: "",
    level: "",
    status: "",
    created_at: ""
  });

  const router = useRouter();
  const [pid] = useState(router.query.pid);

  const [message, setMessage] = useState({ message: "", status: "" });

  const optionsLevel = [
    {value: '', text: '-- Selecione um nível de acesso --'},
    {value: 'admin', text: 'Administrador'},
    {value: 'user', text: 'Usuário'},
    {value: 'reader', text: 'Leitor'},
  ];

  const optionsStatus = [
    {value: '', text: '-- Selecione um estado --'},
    {value: 'true', text: 'Ativo'},
    {value: 'false', text: 'Inativo'},
  ];


  useEffect(() => {
    if (!pid) return;  // Evitar requisição se o pid não estiver disponível

    const getUser = async () => {
      try {
        const response = await Axios.get(API_URL + pid);
        console.log(response.data); // Certifique-se de que os dados são retornados corretamente
        setMessage({ message: "Estudante Encontrado com Sucesso! ", status: "ok" });
        setUser(response.data); // Atualiza o estado com os dados do estudante
      } catch (error) {
        console.error('Erro ao buscar o estudante:', error);
        setMessage({ message: "Erro ao buscar o Estudante!", status: "error" });
      }
    };

    getUser();

  }, [pid]);
      
      const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({
          ...user,
          [name]: value
        });
      };

      const handleUpdateUser = async () => {
        try {
          console.log("Dados enviados para atualização:", user);  // Log para verificação
      
          const response = await Axios.put(API_URL + pid, user); // Enviando dados corretamente
          console.log("Resposta do servidor:", response.data);
      
          setMessage({ message: "Estudante atualizado com sucesso! ", status: "ok" });  // Mensagem fixa de sucesso na atualização
        } catch (error) {
          console.error("Erro ao alterar o Estudante:", error.response ? error.response.data : error.message);
          setMessage({ message: "Erro ao alterar o Estudante! ", status: "error" });
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
                <h3> Edição de Usuário </h3>
            
                <form method="POST">
                <div className="form-group">
                    <label className="form-label" htmlFor="name">Nome</label>
                    <input type="text" id="name" name="name" className="form-control" value={user.name} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">E-mail</label>
                    <input type="text" id="email" name="email" className="form-control" value={user.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="username">Usuário</label>
                    <input type="text" id="username" name="username" className="form-control" value={user.username} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="password">Senha</label>
                    <input type="password" id="password" name="password" className="form-control" value={user.password} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="level">Nível</label>
                    <select className="form-select" id="level" name="level" value={user.level} onChange={handleChange}>
                      {optionsLevel.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="status">Status</label>
                    <select className="form-select" id="status" name="status" value={user.status} onChange={handleChange}>
                      {optionsStatus.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="created_at">Data de Criação</label>
                    <input type="text" id="created_at" name="created_at" className="form-control" value={ user.created_at } readOnly/>
                </div>
                <div className="form-group p-2">
                    <button className="btn btn-outline-success" type="button" onClick={handleUpdateUser} >Salvar</button>
                    <Link className="btn btn-outline-info" href="/admin/users">Voltar</Link>
                </div>
                </form>
            </div>
        </div>
      </div>  
  </>
  )
}

