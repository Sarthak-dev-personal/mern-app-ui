import { useEffect } from "react";
import axios from "axios";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import { addConnections } from "../utils/connectionSlice";
import { BASE_URL } from "../contants";

const Connections = () => {
    const connections = useSelector(store => store.connectionsSlice);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const response = await axios.get(
                BASE_URL + '/user/connections', {
                    withCredentials: true,
                }
            );


            if (!response.data.data) {
                dispatch(addConnections([]));
            } else {
                dispatch(addConnections(response.data.data));
            }
        } catch (error) {
            console.error(error.response?.data);
        }
    }

    useEffect(
        () => {
            fetchConnections();
        }, []
    );


    if (!connections) return;

    if (connections.length === 0) {
        return <h1 className="font-extrabold">No Connections yet. Start sending interest right away!!</h1>
    }
    return <>
        { connections.length > 0 &&
            <div className="text-center my-10">
                <h1 className="text-center font-extrabold my-10 text-gray-600 text-4xl">
                    Existing Connections
                </h1>
                { connections.map(
                    connection => {
                        return <div
                            key={connection._id}
                            className="flex p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
                        >
                            <div>
                                <img
                                    src={ connection.photoUrl }
                                    alt="photo"
                                    className="w-20 h-20 rounded-full"
                                />
                            </div>
                            <div className="mx-4 text-left">
                                <h2 className="font-bold text-xl">{ connection.firstName + " " + connection.lastName }</h2>
                                { connection.age && connection.gender && <p>{ connection.age + ", " + connection.gender }</p> }
                                <p>{ connection.about }</p>
                            </div>
                        </div>
                    }
                ) }
            </div>
        }
    </>
}

export default Connections;
