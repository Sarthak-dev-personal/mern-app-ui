import {
    useEffect,
    useState,
} from "react";

import axios from "axios";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    addRequests,
    removeRequest,
} from "../utils/requestsSlice";

import { BASE_URL } from "../contants";

const Requests = () => {
    const requests = useSelector(store => store.requestsSlice);
    const dispatch = useDispatch();
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const fetchRequests = async() => {
        try {
            const response = await axios.get(
                BASE_URL + '/user/requests/received', {
                    withCredentials: true,
                }
            );

            if (response.data.connectionRequests?.length > 0) {
                dispatch(addRequests(response.data.connectionRequests));
            } else {
                dispatch(addRequests([]));
            }
        } catch (error) {
            console.error(error.data);
        }
    };

    const reviewRequests = async(status, requestId) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/request/review/${status}/${requestId}`, { /* Empty payload */ },
                {
                    withCredentials: true,
                }
            );

            dispatch(removeRequest(requestId));
            setSuccessMessage(response.data.message);
            setShowSuccessToast(true);
            setTimeout(
                () => {
                    setShowSuccessToast(false);
                    setSuccessMessage("");
                }, 3000,
            );
        } catch (error) {
            console.error(error.data);
        }
    };

    useEffect(() => {
        fetchRequests();
        setShowSuccessToast(false);
        setSuccessMessage("");
    }, []);

    if (!requests) {
        return;
    }

    if (showSuccessToast) {
        return  <div className="toast toast-middle toast-center z-1000">
                    <div className="alert alert-success">
                        <span>{ successMessage }</span>
                    </div>
                </div>
    }

    if (requests.length === 0) {
        return <h1 className="text-center font-extrabold my-10 text-gray-600 text-4xl">No more pending requests!!</h1>
    }

    return <>
        { requests &&
            <div className="text-center my-10">
                <h1 className="text-center font-extrabold my-10 text-gray-600 text-4xl">
                    Existing Requests
                </h1>
                { requests.map(
                    request => {
                        const {
                            photoUrl,
                            firstName,
                            lastName,
                            age,
                            gender,
                            about,
                        } = request.fromUserId;
                        return <div
                            key={request._id}
                            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
                        >
                            <div>
                                <img
                                    src={ photoUrl }
                                    alt="photo"
                                    className="w-20 h-20 rounded-full"
                                />
                            </div>
                            <div className="mx-4 text-left">
                                <h2 className="font-bold text-xl">{ firstName + " " + lastName }</h2>
                                { age && gender && <p>{ age + ", " + gender }</p> }
                                <p>{ about }</p>
                            </div>
                            <div>
                                <button
                                    className="btn btn-primary mx-2"
                                    onClick={() => reviewRequests("reject", request._id)}
                                >Reject</button>
                                <button
                                    className="btn btn-secondary mx-2"
                                    onClick={() => reviewRequests("accept", request._id)}
                                >Accept</button>
                            </div>
                        </div>
                    }
                )}
            </div>
        }
    </>
}

export default Requests;
