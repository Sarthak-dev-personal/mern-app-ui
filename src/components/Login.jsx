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
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("male")
    const [isLoginFlow, setIsLoginFlow] = useState(true);
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
    };

    const signupHandler = async() => {
        try {
            const response = await axios.post(
                BASE_URL + '/signup',
                {
                    firstName,
                    lastName,
                    emailId,
                    password,
                    gender,
                }, {
                    withCredentials: true,
                }
            );

            dispatch(addUser(response.data.data));
            navigate("/profile");
        } catch (error) {
            setError(error.response?.data);
        }
    };

    return (
        <div className="flex my-10 justify-center pb-10">
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title justify-center">{isLoginFlow ? 'Login' : 'Sign Up'}</h2>
                    {
                        !isLoginFlow && <>
                            <div>
                                <legend className="fieldset-legend my-2">First Name</legend>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Enter First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div>
                                <legend className="fieldset-legend my-2">Last Name</legend>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Enter Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <legend className="fieldset-legend my-2">Gender</legend>
                            <select
                                value={gender}
                                className="select"
                                onChange={e => setGender(e.target.value)}
                            >
                                <option >male</option>
                                <option >female</option>
                                <option >others</option>
                            </select>

                        </>
                    }

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
                            onClick={isLoginFlow ? loginHandler : signupHandler}
                        >
                            {isLoginFlow ? 'Login' : 'Sign Up'}
                        </button>
                    </div>
                </div>
                <p
                    className="mx-auto cursor-pointer pb-10"
                    onClick={() => setIsLoginFlow(isLoginFlow => !isLoginFlow)}
                >
                    { isLoginFlow ? 'New User? Sign Up First' : 'Already Signed Up? Login Now!' }
                </p>
            </div>
        </div>
    );
}

export default Login;
