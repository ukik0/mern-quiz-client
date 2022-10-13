import {useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {fetchMe} from './redux/slices/authSlice';

import {Route, Routes} from 'react-router-dom';

import AuthPage from './pages/AuthPage/AuthPage';
import NotFoundPage from './pages/NoFoundPage/NotFoundPage';
import QuizPage from './pages/QuizPage/QuizPage';

import {ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
    const dispatch = useDispatch();

    const loading = useSelector((state) => state?.auth?.status)

    useEffect(() => {
        dispatch(fetchMe());
    }, []);

    return (
        <>
            <Routes>
                <Route path="/" element={<AuthPage/>}/>
                <Route path="/quiz" element={<QuizPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}

export default App;
