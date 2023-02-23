
import React, { useState, useEffect } from "react";
import Layout from '../../Components/Layout';
import axios from "axios";
import moment from "moment";
import { message, Table } from "antd";
import { BASE_URL } from "../../services/api";



const DoctorAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/doctor/doctor-appointments`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (res.data.success) {
                setAppointments(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAppointments();
    }, []);

    // handleStatus
    const handleStatus = async (record, status) => {

        try {
            const res = await axios.post(`${BASE_URL}/api/v1/doctor/update-status`, {
                appointmentsId: record._id, status
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.success) {
                message.success(res.data.message);
                getAppointments();
            }
        } catch (error) {
            console.log(error);
            message.error("Something Went Wrong");
        }

    }



    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
        },
        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => (
                <span>
                    {record.doctorInfo.firstName} {record.doctorInfo.lastName}
                </span>
            ),
        },
        {
            title: "Phone",
            dataIndex: "phone",
            render: (text, record) => <span>{record.doctorInfo.phone}</span>,
        },
        {
            title: "Date & Time",
            dataIndex: "date",
            render: (text, record) => (
                <span>
                    {moment(record.date).format("DD-MM-YYYY")} &nbsp;
                    {moment(record.time).format("HH:mm")}
                </span>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="d-flex">
                    {record.status === "pending" && (
                        <div className="d-flex">
                            <button
                                className="btn btn-success"
                                onClick={() => handleStatus(record, "approved")}
                            >
                                Approved
                            </button>
                            <button
                                className="btn btn-danger ms-2"
                                onClick={() => handleStatus(record, "reject")}
                            >
                                Reject
                            </button>
                        </div>
                    )}
                </div>
            ),
        }
    ];

    return (
        <Layout>
            <h1>Doctor Appointments</h1>
            <Table columns={columns} dataSource={appointments} />
        </Layout>
    )
}

export default DoctorAppointments;
