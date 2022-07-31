import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../utils/http';

export const checkUser = createAsyncThunk('/user/checkUser', async () => {
    const res = await http.get('/user/check-user');
    return res.data;
});

export const registerUser = createAsyncThunk('/userSlice/register', async (dataUser) => {
    const res = await http.post('/user/register', dataUser);
    return res.data;
});

export const verifyOtp = createAsyncThunk('/userSlice/verify', async (dataVerify) => {
    const res = await http.post('/user/verify', dataVerify);
    return res.data;
});

export const loginUser = createAsyncThunk('/userSlice/login', async (dataLogin, { rejectWithValue }) => {
    try {
        const res = await http.post('/user/login', dataLogin);
        return res.data;
    } catch (err) {
        if (err.response && err.response.data.message) {
            return rejectWithValue(err.response.data.message);
        } else {
            return rejectWithValue(err.message);
        }
    }
});

export const updateUserAvatar = createAsyncThunk('/userSlice/updateAvatar', async (data) => {
    const res = await http.post('/user/upload-avatar', data);
    return res.data;
});

export const updateInforUser = createAsyncThunk('/userSlice/updateInfor', async (data) => {
    const res = await http.put('/user/update-infor', data);
    return res.data;
});

export const logout = createAsyncThunk('/userSlice/logout', async () => {
    const res = await http.post('/user/logout');
    return res.data;
});

const userSlice = createSlice({
    name: 'User',
    initialState: {
        email: [],
        verify: [],
        inforUserLogin: null,
        updateAvatar: null,
        isLogin: false,
        changeAvatarSuccess: null,
        errorLogin: null,
    },
    extraReducers: {
        [registerUser.fulfilled]: (state, action) => {
            state.email = action.payload.element;
        },

        [verifyOtp.fulfilled]: (state, action) => {
            state.verify = action.payload.element.insertedId;
            state.inforUserLogin = action.payload.user
        },

        [loginUser.pending]: (state) => {
            state.error = null
          },

        [loginUser.fulfilled]: (state, action) => {
            state.inforUserLogin = action.payload;
        },

        [loginUser.rejected]: (state, action) => {
            state.errorLogin = action.payload
        },

        [checkUser.fulfilled]: (state, action) => {
            state.inforUserLogin = action.payload;
            state.isLogin = true;
        },

        [updateUserAvatar.fulfilled]: (state, action) => {
            state.changeAvatarSuccess = action.payload;
        },

        [logout.fulfilled]: (state, action) => {
            state.inforUserLogin = null;
            state.isLogin = false;
        },
    },
});

export default userSlice.reducer;
