import { useEffect } from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Outlet } from "react-router-dom";

import NavBar from "./Navbar";
import Footer from "./Footer";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../contants";

const Body = () => {
    const user = useSelector(state => state.userSlice);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchUser = async () => {
        if (user) {
            return;
        }

        try {
            const userData =  await axios.get(
                `${BASE_URL}/profile/view`, {
                    withCredentials: true,
                }
            );

            dispatch(addUser(userData.data));
        } catch (error) {
            console.error(error.response.data);

            if (error.status === 401) {
                return navigate("/login");
            }
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    );
}

export default Body;
