import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../redux/slice/postSlice';
import Posts from '../components/Post/Posts';
import '../sass/home.scss';
import SideBar from '../components/SideBar/SideBar';

const Home = () => {
    const { posts } = useSelector((state) => state.Posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPosts());
        window.scroll(0, 0);
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
