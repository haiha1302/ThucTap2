import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../redux/slice/postSlice';
import Header from '../components/header/Header';
import Posts from '../components/Post/Posts';
import '../sass/home.scss';
import SideBar from '../components/SideBar/SideBar'

const Home = () => {
    const { posts } = useSelector((state) => state.Posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);
    return (
        <>
            <div className="home">
                <Posts posts={posts} />
                <SideBar />
            </div>
        </>
    );
};

export default Home;
