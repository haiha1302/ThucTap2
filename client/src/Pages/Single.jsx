import SinglePost from "../components/SinglePost/SinglePost";
import SideBar from '../components/SideBar/SideBar'
import '../sass/single.scss'

const Single = () => {
    return (
        <div className="single">
            <SinglePost />
            <SideBar />
        </div>
    )
}

export default Single