// ******************************************************************
import React from 'react';
import Layout from '../Components/Layout';
import { message, Tabs } from "antd";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../services/api';
import { hideLoading, showLoading } from '../redux/features/alertSlice';



const NotificationPage = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    //   handle read notification
    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post(`${BASE_URL}/api/v1/uesr/get-all-notification`, {
                userId: user._id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            window.location.reload();
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("somthing went wrong");
        }
    }


    // handle read handleDeleteAllRead
    const handleDeleteAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post(`${BASE_URL}/api/v1/uesr/delete-all-notification`, {
                userId: user._id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            window.location.reload();
            dispatch(hideLoading());

            if (res.data.success) {
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }

        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("somthing went wrong");
        }
    }



    return (
        <Layout>
            <h4 className="p-3 text-center">Notification Page</h4>
            <Tabs>
                <Tabs.TabPane tab="unRead" key={0}>
                    <div className="d-flex justify-content-end">
                        <h4 className="p-2" style={{ cursor: "pointer" }} onClick={handleMarkAllRead}>
                            Mark All Read
                        </h4>
                    </div>
                    {
                        user?.notifcation.map((notificationMgs) => {
                            return (
                                <div className="card" style={{ cursor: "pointer" }} onClick={() => navigate(notificationMgs.data.onClickPath)}>
                                    <div>
                                        {notificationMgs.message}
                                    </div>
                                </div>
                            )
                        })
                    }
                </Tabs.TabPane>
                <Tabs.TabPane tab="Read" key={1}>
                    <div className="d-flex justify-content-end">
                        <h4 className="p-2 text-primary" style={{ cursor: "pointer" }} onClick={handleDeleteAllRead}>
                            Delete All Read
                        </h4>
                    </div>
                    {
                        user?.seennotification.map((notificationMgs) => {
                            return (
                                <div className="card" style={{ cursor: "pointer" }} onClick={() => navigate(notificationMgs.data.onClickPath)}>
                                    <div>
                                        {notificationMgs.message}
                                    </div>
                                </div>
                            )
                        })
                    }
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    )
}

export default NotificationPage;
