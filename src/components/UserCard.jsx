import { useDispatch } from "react-redux";
import axios from "axios";

import { removeUserFromFeed } from "../utils/feedSlice";
import { BASE_URL } from "../contants";
import MaleUserIcon from "../assets/man-user-circle-icon.png";
import FemaleUserIcon from "../assets/female-user-icon.jpeg";

const UserCard = ({ user }) => {
    const {
        firstName,
        lastName,
        about,
        age,
        gender,
        photoUrl,
        _id,
    } = user;

    const dispatch = useDispatch();

    const handleSendReviewRequest = async(status, userId) => {
        try {
            await axios.post(
                `${BASE_URL}/request/send/${status}/${userId}`,
                {},
                {
                    withCredentials: true,
                }
            );
            dispatch(removeUserFromFeed(userId));
        } catch (error) {
            console.error(error.response.data);
        }
    }

    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                {
                    photoUrl ?
                    <img
                        src={ photoUrl }
                        alt="User has not uploaded any image"
                    /> :
                    <img
                        src={ gender === "male" ? MaleUserIcon : FemaleUserIcon }
                        alt="User has not uploaded any image"
                    />
                }
            </figure>
            <div className="card-body">
                {firstName && lastName && <h2 className="card-title">{ firstName + " " + lastName }</h2>}
                {age && gender && <p>{ gender + ", " + age }</p>}
                {about && <p> {about }</p>}
                <div className="card-actions justify-center my-10">
                    <button
                        className="btn btn-primary"
                        onClick={() => handleSendReviewRequest("ignored", _id)}
                    >
                        Ignore
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => handleSendReviewRequest("accepted", _id)}
                    >
                        Interested
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserCard;
