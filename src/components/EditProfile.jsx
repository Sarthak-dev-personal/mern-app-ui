import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import UserCard from "./UserCard";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../contants";

const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user.firstName ?? "");
    const [lastName, setLastName] = useState(user.lastName ?? "");
    const [age, setAge] = useState(user.age ?? "");
    const [skills, setSkills] = useState(user.skills || []);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl ?? "");
    const [gender, setGender] = useState(user.gender ?? "male");
    const [about, setAbout] = useState(user.about ?? "");
    const [error, setError] = useState("");
    const [showToastMessage, setShowToasMessage] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const dispatch = useDispatch();

    const handleSkillsChange = (event) => {
        setSkills(event.target?.value?.split(",")?.map(skill => skill.trim()));
    }

    const handleSave = async() => {
        try {
            setError("");
            setShowToasMessage(false);
            const response = await axios.patch(
                BASE_URL + '/profile/edit',
                {
                    firstName,
                    lastName,
                    age,
                    skills,
                    photoUrl,
                    gender,
                    about,
                }, {
                    withCredentials: true,
                }
            );

            dispatch(addUser(response?.data?.data));
            setToastMessage(response?.data?.message);
            setShowToasMessage(true);
            setTimeout(
                () => setShowToasMessage(false), 3000,
            );
        } catch (error) {
            setError(error?.response?.data);
        }
    }

    return (
        <>
            {
                showToastMessage &&
                    <div className="toast toast-top toast-center z-1000">
                        <div className="alert alert-success">
                            <span>{ toastMessage }</span>
                        </div>
                    </div>
            }
            <div className="flex justify-center my-10">
                <div className="flex justify-center mx-10">
                    <div className="card bg-base-300 w-96 shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Edit Profile</h2>
                            <div>
                                <legend className="fieldset-legend my-2">First Name</legend>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Enter First Name"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </div>

                            <div>
                                <legend className="fieldset-legend my-2">Last Name</legend>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Enter Last Name"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </div>

                            <div>
                                <legend className="fieldset-legend my-2">Age</legend>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Enter Age"
                                    value={age}
                                    onChange={e => setAge(e.target.value)}
                                />
                            </div>

                            <div>
                                <legend className="fieldset-legend my-2">Skills</legend>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Enter Skills"
                                    value={skills}
                                    onChange={handleSkillsChange}
                                />
                            </div>

                            <div>
                                <legend className="fieldset-legend my-2">Photo URL</legend>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Enter Photo URL"
                                    value={photoUrl}
                                    onChange={e => setPhotoUrl(e.target.value)}
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

                            <div>
                                <legend className="fieldset-legend my-2">About</legend>
                                <textarea
                                    className="textarea h-24"
                                    placeholder="About"
                                    value={about}
                                    onChange={e => setAbout(e.target.value)}
                                ></textarea>
                            </div>

                            <p className="text-red-500 justify-center">{error}</p>
                            <div className="card-actions justify-center my-2">
                            <button
                                    className="btn btn-primary"
                                    onClick={handleSave}
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div> */}
                    <UserCard user={{firstName, lastName, about, age, gender, photoUrl}}/>
                {/* </div> */}
            </div>
        </>
    );
}

export default EditProfile;
