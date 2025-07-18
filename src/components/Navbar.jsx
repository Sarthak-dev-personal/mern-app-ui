import {
    useDispatch,
    useSelector,
} from "react-redux";

import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

import { BASE_URL } from "../contants";

const NavBar = () => {
    const user = useSelector(store => store.userSlice);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async() => {
        try {
            await axios.post(`${BASE_URL}/logout`, {
                emailId: user.emailId,
            }, {
                withCredentials: true,
            });

            dispatch(removeUser());
            navigate("/login");
        } catch (error) {
            console.error(error?.response?.data);
        }
    }

    return (
        <div className="navbar bg-base-300 shadow-sm">
            <div className="flex-1">
            <Link to= "/" className="btn btn-ghost text-xl">Dev App 👨‍💻</Link>
            </div>
            { user &&
                <div className="flex gap-2">
                    <div className="form-control">Welcome, {user.firstName}!</div>
                    <div className="dropdown dropdown-end mx-5 flex">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User Image"
                                    src={user.photoUrl}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <Link
                                    className="justify-between"
                                    to="/profile"
                                >
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link to='/connections'>Connections</Link>
                            </li>
                             <li>
                                <Link to='/requests'>Requests</Link>
                            </li>
                            <li>
                                <Link onClick={handleLogout}>Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            }
        </div>
    );
}

export default NavBar;
