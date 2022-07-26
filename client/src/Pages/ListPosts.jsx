import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListPostsByUser } from '../redux/slice/postSlice';
import Posts from '../components/Post/Posts';

const ListPosts = () => {
    const posts = useSelector((state) => state.Posts.listPostsByUser);
    const { inforUserLogin } = useSelector((state) => state.User);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListPostsByUser(inforUserLogin._id));
    }, [dispatch, inforUserLogin._id]);

    return (
        <div>
            <Posts posts={posts} />
        </div>
    );
};

export default ListPosts;
