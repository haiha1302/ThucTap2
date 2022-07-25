import { Routes, Route } from 'react-router-dom';
import FormLogin from './components/FormLogin/FormLogin';
import FormRegister from './components/FormLogin/FormRegister';
import FormValidateOtp from './components/FormLogin/FormValidateOtp';
import Header from './components/header/Header';
import Home from './Pages/Home';
import CreatePost from './Pages/CreatePost';
import Settings from './Pages/Settings';
import ListPosts from './Pages/ListPosts';
import RequiredAuth from './components/RequiredAuth';
import Single from './Pages/Single';
// import ReviewForm from './components/ReviewForm/ReviewForm';

function App() {
    return (
        <div className="container">
            <Header />
            <Routes>
            {/* <Route path='/test' element={<ReviewForm />} /> */}
                <Route path="/post/:id" element={<Single />} />
                <Route index element={<Home />} />
                <Route
                    path="/profile"
                    element={
                        <RequiredAuth>
                            <Settings />
                        </RequiredAuth>
                    }
                />
                <Route
                    path="/create-post"
                    element={
                        <RequiredAuth>
                            <CreatePost />
                        </RequiredAuth>
                    }
                />
                <Route
                    path="/list-posts"
                    element={
                        <RequiredAuth>
                            <ListPosts />
                        </RequiredAuth>
                    }
                />
                <Route path="/login" element={<FormLogin />} />
                <Route path="/register" element={<FormRegister />} />
                <Route path="/validate-otp" element={<FormValidateOtp />} />
            </Routes>
        </div>
    );
}

export default App;
