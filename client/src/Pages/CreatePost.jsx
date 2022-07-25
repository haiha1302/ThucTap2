import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import QuillEditor from '../components/Editor/QuillEditor';
import { FaPlus } from 'react-icons/fa';
import http from '../utils/http';
import '../sass/createPost.scss';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState(null);
    const author_infor = useSelector((state) => state.User.inforUserLogin);
    const navigate = useNavigate();
    const [files, setFiles] = useState([])

    const onChangeCats = (e) => {
        setCategory(e.target.value);
    };

    const onEditorChange = (value) => {
        setContent(value);
    };

    const onFilesChange = (files) => {
        setFiles(files)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = {
            author_id: author_infor._id,
            author_name: author_infor.username,
            title,
            content,
            category,
            createAt: new Date().toString(),
        };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append('file', file);
            data.append('filename', filename);

            try {
                const urlImg = await http.post('/posts/uploadFiles', data);
                newPost.photo = urlImg.data.url;
            } catch (err) {}
        }

        try {
            const res = await http.post('/posts/create', newPost);
            navigate(`/post/${res.data.insertedId}`, { replace: true });
        } catch (err) {}
    };

    return (
        <div className="write">
            {file && <img className="writeImg" src={file ? URL.createObjectURL(file) : null} alt="" />}
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <FaPlus className="writeIcon" />
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <input
                        type="text"
                        placeholder="Title"
                        className="writeInput"
                        autoFocus={true}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="writeFormGroup">
                    {/* <ReactQuill
                        placeholder="Nhập nội dung của bạn"
                        className="writeInput writeText"
                        value={content}
                        onChange={(value) => setContent(value)}
                    /> */}
                    <QuillEditor
                        placeholder={'Nhập nội dung của bạn...'}
                        onEditorChange={onEditorChange}
                        onFilesChange={onFilesChange}
                    />
                </div>
                <div className="groupBtn">
                    <div className="selectCats">
                        <label>Chọn thể loại</label>
                        <select className="selectInput" onChange={onChangeCats}>
                            <option value={'Sport'}>Sport</option>
                            <option value={'Food'}>Food</option>
                            <option value={'Music'}>Music</option>
                            <option value={'Life'}>Life</option>
                            <option value={'Health'}>Health</option>
                            <option value={'Diy'}>Diy</option>
                        </select>
                    </div>
                    <button className="writeSubmit" type="submit">
                        Publish
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
