import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../utils/http';

export const createPost = createAsyncThunk('postSlice/create', async (dataPost) => {
    const res = await http.post('/posts/create', dataPost);
    return res.data;
});

export const getAllPosts = createAsyncThunk('postSlice/getAllPosts', async () => {
    const res = await http.get('/posts/all-posts');
    return res.data;
});

export const getDetailPost = createAsyncThunk('/postSlice/getDetailPosts', async (idPost) => {
    const res = await http.post(`/posts/${idPost}`);
    return res.data;
});

export const getListPostsByUser = createAsyncThunk('/postSlice/getListPostByUser', async (idUser) => {
    const res = await http.post(`/posts/list-posts`, { author_id: idUser });
    return res.data;
});

const postSlice = createSlice({
    name: 'Posts',
    initialState: {
        postId: null,
        posts: [],
        detailPost: {},
        listPostsByUser: [],
    },
    extraReducers: {
        [getAllPosts.fulfilled]: (state, action) => {
            state.posts = action.payload;
        },

        [getDetailPost.fulfilled]: (state, action) => {
            state.detailPost = action.payload;
        },

        [getListPostsByUser.fulfilled]: (state, action) => {
            state.listPostsByUser = action.payload;
        },
    },
});

export default postSlice.reducer;
