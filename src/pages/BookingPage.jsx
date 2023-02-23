/* ************************************************** */

import React, { useState, useEffect } from 'react';
import Layout from '../Components/Layout';
import axios from "axios";
import { BASE_URL } from '../services/api';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { hideLoading, showLoading } from '../redux/features/alertSlice';



const BookingPage = () => {
    const { user } = useSelector((state) => state.user);
    const params = useParams();
    const [doctors, setDoctors] = useState([]);
    const [date, setDate] = useState("");
    const [time, setTime] = useState();
    const [isAvailable, setIsAvailable] = useState(false);
    const dispatch = useDispatch();



    // login user data
    const getUserData = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/doctor/getDoctorById`, {
                doctorId: params.id
            }, {
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



    // handle Availability
    const handleAvailability = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post(
                `${BASE_URL}/api/v1/uesr/booking-availbility`,
                { doctorId: params.doctorId, date, time },                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                setIsAvailable(true);
                console.log(isAvailable);
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    };



    // handle Booking
    const handleBooking = async () => {
        try {

            if (!date && !time) {
                return alert("Date & Time Required");
            }

            dispatch(showLoading());
            const res = await axios.post(`${BASE_URL}/api/v1/uesr/book-appointment`,
                {
                    doctorId: params.id,
                    userId: user._id,
                    doctorInfo: doctors,
                    userInfo: user,
                    date: date,
                    time: time
                }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
        }
    }


    useEffect(() => {
        getUserData();
    }, [])
    return (
        <div>
            <Layout>
                <h1>Booking page</h1>
                <div className="container m-2">
                    {
                        doctors && (
                            <>
                                <h4>Dr.{doctors.firstName} {doctors.lastName}</h4>
                                <h4>Fees : {doctors.feesPerCunsaltation}</h4>
                                <h4>
                                    Timings : {doctors.timings && doctors.timings[0]} -{" "}
                                    {doctors.timings && doctors.timings[1]}{" "}
                                </h4>
                                <div className="d-flex flex-column w-50">
                                    <DatePicker
                                        aria-required={"true"}
                                        className="m-2"
                                        format="DD-MM-YYYY"
                                        onChange={(value) => {
                                            setDate(moment(value).format("DD-MM-YYYY"));
                                        }}
                                    />
                                    <TimePicker
                                        aria-required={"true"}
                                        format="HH:mm"
                                        className="mt-3"
                                        onChange={(value) => {
                                            setTime(moment(value).format("HH:mm"));
                                        }}
                                    />
                                    <button
                                        className="btn btn-primary mt-2"
                                        onClick={handleAvailability}
                                    >
                                        Check Availability
                                    </button>
                                    <button className="btn btn-dark mt-2" onClick={handleBooking}>
                                        Book Now
                                    </button>
                                </div>
                            </>
                        )
                    }
                </div>
            </Layout>
        </div>
    )
}

export default BookingPage;
