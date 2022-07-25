import { Link } from 'react-router-dom';
import './post.css';

const Post = ({ post }) => {
    return (
        <div className="post">
            <Link to={`/post/${post._id}`} className="link">
                {post.photo && <img className="postImg" src={post.photo} alt="" />}

                <div className="postInfo">
                    <div className="postCats">
                        {post?.categories?.map((c) => (
                            <span className="postCat">{c.name}</span>
                        ))}
                    </div>
                    <span className="postTitle">{post.title}</span>
                    <hr />
                </div>
                <div className="postDesc" dangerouslySetInnerHTML={{ __html: post.content }} />
            </Link>
        </div>
    );
};

export default Post;
