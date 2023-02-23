/* ******************************************************************* */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../services/api';
import Layout from '../Components/Layout';
import { Row } from "antd";
import DoctorList from '../Components/DoctorList';


const HomePages = () => {
  const [doctors, setDoctors] = useState([]);



  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/uesr/getAllDoctors`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUserData();
  }, [])
  return (
    <Layout>
        <h1 className="text-center">Home Page</h1>
        {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
    </Layout>
  )
}

export default HomePages;
