import NavAdmin from '@/components/NavAdmin'
import MenuUsers from '@/components/MenuUsers';
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/router';

export default function readProfessionals() {
  const API_URL = "http://localhost:8080/api/professionals/id/"; // Rota para profissionais

  const [professional, setProfessional] = useState({
    name: "",
    specialty: "",
    contact: "",
    phone_number: "",
    status: "",
    created_at: ""
  });

  const router = useRouter();
  const { pid } = router.query;  // Obtenção do ID (pid) diretamente da URL

  const [message, setMessage] = useState({ message: "", status: "" });

  const optionsStatus = [
    { value: '', text: '-- Selecione um estado --' },
    { value: 'true', text: 'Ativo' },
    { value: 'false', text: 'Inativo' },
  ];

  useEffect(() => {
    if (!pid) return;  // Evitar requisição se o pid não estiver disponível

    const getProfessional = async () => {
      try {
        const response = await Axios.get(API_URL + pid);
        console.log(response.data); // Certifique-se de que os dados são retornados corretamente
        setProfessional(response.data); // Atualiza o estado com os dados do profissional
        setMessage({ message: "Profissional encontrado com sucesso! ", status: "ok" });  // Mensagem fixa de sucesso na busca
      } catch (error) {
        console.error('Erro ao buscar o profissional:', error);
        setMessage({ message: "Erro ao buscar o Profissional! ", status: "error" });
      }
    };

    getProfessional();

  }, [pid]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfessional({
      ...professional,
      [name]: value
    });
  };

  const handleUpdateProfessional = async () => {
    try {
      console.log("Dados enviados para atualização:", professional);  // Log para verificação
  
      const response = await Axios.put(API_URL + pid, professional); // Enviando dados corretamente
      console.log("Resposta do servidor:", response.data);
  
      setMessage({ message: "Profissonal atualizado com sucesso! ", status: "ok" });  // Mensagem fixa de sucesso na atualização
    } catch (error) {
      console.error("Erro ao alterar o Profissonal:", error.response ? error.response.data : error.message);
      setMessage({ message: "Erro ao alterar o Profissonal! ", status: "error" });
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
            <div className={`alert ${message.status === "ok" ? 'alert-success' : 'alert-danger'}`} role='alert'>
              {message.message}
              <Link className='alert-link' href='/admin/professionals'> Voltar</Link>
            </div>
        }
      </div>

      <div className="d-flex justify-content-center p-2">
        <div className="container">
          <div className="row border-bottom">
            <h3> Edição Profissionais </h3>

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

                <div className="form-group">
                    <label className="form-label" htmlFor="created_at">Data de Criação</label>
                    <input type="text" id="created_at" name="created_at" className="form-control" value={professional.created_at} readOnly />
                </div>

                <div className="form-group p-2">
                    <button className="btn btn-outline-success" type="button" onClick={handleUpdateProfessional}>Salvar</button>
                    <Link className="btn btn-outline-info" href="/admin/professionals">Voltar</Link>
                </div>
                </form>
          </div>
        </div>
      </div>
    </>
  )
}