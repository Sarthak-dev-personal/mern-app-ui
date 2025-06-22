import {useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { BASE_URL } from "../contants";
import { addUser } from "../utils/userSlice";

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginHandler = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}/login`,
                {
                    emailId,
                    password,
                }, {
                    // This needs to be used with Axios to set cookie data from different domain (localhost: 3000 in this case).
                    withCredentials: true,
                }
            );

            const user = response.data;

            dispatch(addUser(user.user));
            navigate("/");
        } catch (error) {
            setError(error?.response?.data);
        }
    }

    return (
        <div className="flex my-10 justify-center">
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    <div>
                        <legend className="fieldset-legend my-2">Email ID</legend>
                        <input
                            type="text"
                            className="input"
                            placeholder="Enter Email ID"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                        />
                    </div>
                    <div>
                        <legend className="fieldset-legend my-2">Password</legend>
                        <input
                            type="password"
                            className="input"
                            placeholder="Enter Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <p className="text-red-500 justify-center">{error}</p>
                    <div className="card-actions justify-center my-2">
                        <button
                            className="btn btn-primary"
                            onClick={loginHandler}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
