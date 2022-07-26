import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailPost } from '../../redux/slice/postSlice';
import ReactQuill from 'react-quill';
import http from '../../utils/http';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import './singlePost.css';
// import Comments from '../Comments/Comments';

const SinglePost = () => {
    const { id } = useParams();
    const post = useSelector((state) => state.Posts.detailPost.post);
    const author_id = useSelector((state) => state.User.inforUserLogin?._id);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [updateMode, setUpdateMode] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getDetailPost(id));
    }, [id, dispatch]);

    const handleDelete = async () => {
        try {
            await http.delete(`/posts/${post._id}`);
            navigate('/list-posts', { replace: true });
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleUpdate = async () => {
        try {
            await http.put(`/posts/${post._id}`, {
                title,
                content,
            });
            setUpdateMode(false);
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <>
            <div className="singlePost">
                <div className="singlePostWrapper">
                    {post?.photo && <img src={post?.photo ? post?.photo : null} alt="" className="singlePostImg" />}
                    {updateMode ? (
                        <input
                            type="text"
                            value={title}
                            className="singlePostTitleInput"
                            autoFocus
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    ) : (
                        <h1 className="singlePostTitle">
                            {title}
                            {post?.author_id === author_id && (
                                <div className="singlePostEdit">
                                    <FaEdit className="singlePostIcon" onClick={() => setUpdateMode(true)} />
                                    <FaTrashAlt className="singlePostIcon" onClick={handleDelete} />
                                </div>
                            )}
                        </h1>
                    )}
                    <div className="singlePostInfo">
                        <span className="singlePostAuthor">
                            Author:
                            <Link to={`/?user=${post?.username}`} className="link">
                                <b> {post?.author_name}</b>
                            </Link>
                        </span>
                        <span className="singlePostDate">{post?.createAt.slice(0, 16)}</span>
                    </div>
                    {updateMode ? (
                        <ReactQuill
                            placeholder="Nhập nội dung của bạn"
                            className="writeInput writeText"
                            value={content}
                            onChange={(value) => setContent(value)}
                        />
                    ) : (
                        <>
                            <div dangerouslySetInnerHTML={{ __html: post?.content }} />
                        </>
                    )}
                    {updateMode && (
                        <button className="singlePostButton" onClick={handleUpdate}>
                            Update
                        </button>
                    )}
                </div>
            </div>
            {/* <Comments /> */}
        </>
    );
};
export default SinglePost;
