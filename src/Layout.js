import App from './App';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import Home from './components/Home/Home';
import ManageUser from './components/Admin/Content/ManageUser';
import Dashboard from './components/Admin/Content/Dashboard';
import Login from './components/Auth/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import Register from './components/Auth/Register';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';

const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />} >
                    <Route index element={<Home />}></Route>
                    <Route path='user' element={<ListQuiz />} />
                </Route>

                <Route path='quiz/:id' element={<DetailQuiz/>}/>

                <Route path='admin' element={<Admin />} >
                    <Route index element={<Dashboard />} />
                    <Route path='manage-user' element={<ManageUser />} />
                </Route>

                <Route path='login' element={<Login />} />

                <Route path='register' element={<Register />} />

            </Routes>
            
            <ToastContainer
                position="top-right"
                //autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
                {/* Same as */}
            <ToastContainer />
        </>
    )
}

export default Layout