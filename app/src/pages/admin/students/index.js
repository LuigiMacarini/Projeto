import Axios from 'axios'
import NavAdmin from '@/components/NavAdmin'
import StudentAction from '@/components/StudentAction'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import MenuUsers from '@/components/MenuUsers'

export default function students() {

  const API_URL = "http://localhost:8080/api/students"
  
  const [students, setStudents] = useState([]); 
  
  useEffect(() => {
    const getAllStudents = async () => {
      try {
        const response = await Axios.get(API_URL);
        setStudents(response.data);
      } catch (error) {
        console.error('Erro ao buscar os estudantes:', error);
      }
    };

    getAllStudents();

  }, []);

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
      </div>

  
      <div className="d-flex justify-content-center p-2">
        <div className="container">
        <div className="row border-bottom">
        <h3> Lista de Estudantes </h3>
        
        <table className="table table-hover">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Pais</th>
            <th scope="col">Ação</th>
            </tr>
        </thead>
        <tbody>

        {students.map(student => (
            <tr key={student._id}>
              <th scope="row">{student._id}</th>
              <td>{student.name}</td>
              <td>{student.parents}</td>
              <td>
                <StudentAction pid={ student._id }></StudentAction>
              </td>
            </tr>
        ))}

        </tbody>
        </table>
        </div>
        </div>
      </div>  
  </>
  )
}
