import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {checkIsAuth, logout} from '../../redux/slices/authSlice';

import {useNavigate} from 'react-router-dom';

import {motion} from 'framer-motion';

import Result from '../../components/Result/Result';
import Loader from '../../components/Loader/Loader';

import {toast} from 'react-toastify';

import question from '../../assets/qustions';

import cl from './QuizPage.module.scss';

const QuizPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector(checkIsAuth);
    const isSuccess = useSelector((state) => state?.auth?.data?.success);

    const [loading, setLoading] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [correctQuestions, setCorrectQuestion] = useState(0);
    const progressWidth = (currentQuestion / question.length) * 100;

    const variantClick = (id) => {
        if (id === question[currentQuestion].correct) setCorrectQuestion(correctQuestions + 1);
        setCurrentQuestion(currentQuestion + 1);
    };

    const logoutClick = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        toast.info('Вы успешно вышли из аккаунта!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
        });
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    if (loading) {
        return <Loader/>;
    }

    if (!isAuth) {
        navigate('/');
    }

    return (
        <>
            {question.length === currentQuestion ? (
                <Result
                    correct={correctQuestions}
                    questions={question.length}
                    currentQuestion={setCurrentQuestion}
                    setCorrectQuestion={setCorrectQuestion}
                    isSuccess={isSuccess}
                />
            ) : (
                <div className={cl.wrapper}>
                    <button onClick={logoutClick} className={cl.quit}>
                        Выйти
                    </button>
                    <div className={cl.quiz__progress}>
                        <div style={{width: `${progressWidth}%`}} className={cl.quiz__progress__line}></div>
                    </div>
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.5}}
                        className={cl.quiz__title}>
                        {question[currentQuestion].title}
                    </motion.div>

                    <ul className={cl.quiz__list}>
                        {question[currentQuestion].variants.map((item, idx) => (
                            <motion.li
                                transition={{duration: 0.1, type: 'spring'}}
                                whileHover={{scale: 0.95}}
                                onClick={() => variantClick(idx)}
                                key={item}
                                className={cl.quiz__list__item}>
                                {item}
                            </motion.li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default QuizPage;
