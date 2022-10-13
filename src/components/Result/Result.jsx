import React, { useEffect, useState } from 'react';

import Loader from '../Loader/Loader';

import axios from '../../utils/axios';

import { useDispatch, useSelector } from 'react-redux';
import { fetchSuccess, logout } from '../../redux/slices/authSlice';

import { toast } from 'react-toastify';

import { motion } from 'framer-motion';

import cl from './Result.module.scss';

const Result = ({ correct, questions, currentQuestion, setCorrectQuestion, isSuccess }) => {
  const dispatch = useDispatch();
  const userFullName = useSelector((state) => state?.auth?.data?.fullName);
  const toMail = useSelector((state) => state?.auth?.data?.email);

  const [loading, setLoading] = useState(true);

  const resetQuiz = () => {
    currentQuestion(0);
    setCorrectQuestion(0);
  };

  const sendMail = () => {
    try {
      const { data } = axios.post('/send', { userFullName, toMail });
      dispatch(fetchSuccess());
      toast.info('Сертификат отправлен на почту', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : isSuccess ? (
        <div className={cl.result}>
          <h2 className={cl.result__title}>
            Результаты уже находятся на зарегистрированной почте!
          </h2>
          <button onClick={() => dispatch(logout())}>Выйти из аккаунта</button>
        </div>
      ) : (
        <div className={cl.result}>
          <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" alt="img" />
          <motion.h2
            initial={{ opacity: 0, y: '-100vw' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ y: '100vw' }}
            transition={{ duration: '.8s', type: 'spring' }}>
            <span>Правильных ответов: {correct}</span>
            <p>Всего вопросов: {questions}</p>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: '.5s', type: 'spring' }}
            className={cl.buttons}>
            <button onClick={resetQuiz}>Пройти заново!</button>
            <button onClick={sendMail}>Получить сертификат!</button>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Result;
