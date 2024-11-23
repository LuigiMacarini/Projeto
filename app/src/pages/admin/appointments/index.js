import Axios from 'axios'
import NavAdmin from '@/components/NavAdmin'
import AppointmentAction from '@/components/AppointmentAction'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import MenuUsers from '@/components/MenuUsers'

export default function appointments() {

  const API_URL = "http://localhost:8080/api/appointments"
  
  const [appointments, setAppointments] = useState([]); 
  
  useEffect(() => {
    const getAllAppointments = async () => {
      try {
        const response = await Axios.get(API_URL);
        setAppointments(response.data);
      } catch (error) {
        console.error('Erro ao buscar os agendamentos:', error);
      }
    };

    getAllAppointments();

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
        <h3> Lista de Agendamentos </h3>
        
        <table className="table table-hover">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Profissional</th>
            <th scope="col">Comentário</th>
            <th scope="col">Ação</th>
            </tr>
        </thead>
        <tbody>

        {appointments.map(appointment => (
            <tr key={appointment._id}>
              <th scope="row">{appointment._id}</th>
              <td>{appointment.professional}</td>
              <td>{appointment.comments}</td>
              <td>
                <AppointmentAction pid={ appointment._id }></AppointmentAction>
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