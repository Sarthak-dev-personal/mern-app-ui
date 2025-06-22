import { useEffect } from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import axios from "axios";

import { BASE_URL } from "../contants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
    const feed = useSelector(store => store.feedSlice);
    const dispatch = useDispatch();

    const fetchFeed = async() => {
        if (feed) {
            return;
        }

        try {
            const feedData = await axios.get(`${BASE_URL}/user/feed`, {
                withCredentials: true,
            });

            dispatch(addFeed(feedData?.data?.users[0]));
        } catch (error) {
            console.error(error?.response?.data);
        }
    }

    useEffect(() => {
        fetchFeed();
    }, []);

    return (
        <>
            {
                feed &&
                <div className="flex my-10 justify-center">
                    <UserCard user={feed}/>
                </div>
            }
        </>
    );
}

export default Feed;
