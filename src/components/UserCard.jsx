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
    } = user;

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
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary">Interested</button>
                </div>
            </div>
        </div>
    );
}

export default UserCard;
