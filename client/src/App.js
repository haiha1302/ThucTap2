import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import FormLogin from './components/FormLogin/FormLogin';
import FormRegister from './components/FormLogin/FormRegister';
import FormValidateOtp from './components/FormLogin/FormValidateOtp';
import Home from './Pages/Home';
import Single from './Pages/Single';
import CreatePost from './Pages/CreatePost';
import Settings from './Pages/Settings';
import ListPosts from './Pages/ListPosts';
import PrivateRoute from './components/RequiredAuth';
import NotFound from './Pages/NotFound';
import WithoutNav from './components/RenderNavBar/WithoutNav';
import WithNav from './components/RenderNavBar/WithNav';

function App() {
    return (
        <div className="container">
            <Routes>
                <Route element={<WithoutNav />}>
                    <Route path="/login" element={<FormLogin />} />
                    <Route path="/register" element={<FormRegister />} />
                    <Route path="/validate-otp" element={<FormValidateOtp />} />
                </Route>

                <Route element={<WithNav />}>
                    <Route index element={<Home />} />
                    <Route path="/post/:id" element={<Single />} />
                    <Route path="*" element={<NotFound />} />

                    <Route path="/" element={<PrivateRoute />}>
                        <Route path="profile" element={<Settings />} />
                        <Route path="create-post" element={<CreatePost />} />
                        <Route path="list-posts" element={<ListPosts />} />
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
