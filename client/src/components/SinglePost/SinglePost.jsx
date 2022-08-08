import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import http from '../../utils/http';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import './singlePost.css';

const SinglePost = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const author_id = useSelector((state) => state.User.inforUserLogin?._id);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [updateMode, setUpdateMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const detailPost = async () => {
            const getDetail = await http.post(`/posts/${id}`);
            setPost(getDetail.data.post);
            setTitle(getDetail.data.post.title);
            setContent(getDetail.data.post.content);
        };
        detailPost();
        window.scroll(0, 0);
    }, [id]);

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
                        <>
                            <input
                                type="text"
                                value={title}
                                className="singlePostTitleInput"
                                autoFocus
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <div onClick={() => setUpdateMode(!updateMode)} className="cancelUpdate">
                                Hủy chỉnh sửa
                            </div>
                        </>
                    ) : (
                        <h1 className="singlePostTitle">
                            {title}
                            {post?.author_id === author_id && (
                                <div className="singlePostEdit">
                                    <FaEdit className="singlePostIcon" onClick={() => setUpdateMode(!updateMode)} />
                                    <FaTrashAlt className="singlePostIcon" onClick={handleDelete} />
                                </div>
                            )}
                        </h1>
                    )}
                    <div className="singlePostInfo">
                        <span className="singlePostAuthor">
                            Author:
                            <b> {post?.author_name}</b>
                        </span>
                        <span className="singlePostDate">{new Date(post?.createAt).toDateString()}</span>
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
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        </>
                    )}
                    {updateMode && (
                        <button className="singlePostButton" onClick={handleUpdate}>
                            Update
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};
export default SinglePost;
