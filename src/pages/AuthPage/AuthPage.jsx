import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { toast } from 'react-toastify';

import shareVideo from '../../assets/share.mp4';

import { useNavigate } from 'react-router-dom';

import Modal from '../../components/Modal/Modal';
import ModalRegister from '../../components/ModalRegister/ModalRegister';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, fetchLogin } from '../../redux/slices/authSlice';

import { motion } from 'framer-motion';

import cl from './AuthPage.module.scss';

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(checkIsAuth);
  const message = useSelector((state) => state?.auth?.message);

  const [activeLoginModal, setActiveLoginModal] = useState(false);
  const [activeRegisterModal, setActiveRegisterModal] = useState(false);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  });

  const onSubmit = (val) => {
    dispatch(fetchLogin(val));
    reset();
  };

  if (isAuth) {
    navigate('/quiz');
  }

  useEffect(() => {
    toast.info(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  }, [message]);

  return (
    <div className={cl.wrapper}>
      <video
        src={shareVideo}
        loop
        controls={false}
        muted
        autoPlay
        className={cl.shareVideo}></video>

      <h1 className={cl.title}>
        <p>Квиз игра</p> <span>"80 лет сталинградской битвы"</span>
      </h1>

      <motion.div
        initial={{ y: '100px', opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: '1s', type: 'spring' }}
        className={cl.buttons}>
        <button onClick={() => setActiveLoginModal(!activeLoginModal)} className={cl.primary}>
          Авторизация
        </button>
        <button
          onClick={() => setActiveRegisterModal(!activeRegisterModal)}
          className={cl.secondary}>
          Регистрация
        </button>
      </motion.div>

      <Modal active={activeLoginModal} setActive={setActiveLoginModal}>
        <Typography
          variant="h5"
          component={'div'}
          sx={{ textAlign: 'center', marginBottom: '50px', fontWeight: '700' }}>
          Вход в аккаунт
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            name="email"
            fullWidth
            label="Почта"
            variant="outlined"
            color="primary"
            placeholder="Укажите почту"
            type={'email'}
            focused
            className={cl.TextField}
            inputProps={{ className: cl.TextFieldLabel }}
            sx={{ marginBottom: '20px' }}
            error={!!errors.email?.message}
            helperText={errors.email?.message}
            {...register('email', {
              required: 'Укажите почту',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Неверный формат почты',
              },
            })}
          />
          <TextField
            name="password"
            fullWidth
            label="Пароль"
            variant="outlined"
            color="primary"
            placeholder="Укажите пароль"
            focused
            type={'password'}
            className={cl.TextField}
            inputProps={{ className: cl.TextFieldLabel }}
            sx={{ marginBottom: '20px' }}
            error={!!errors.password?.message}
            helperText={errors.password?.message}
            {...register('password', {
              required: 'Укажите пароль',
              minLength: { value: 5, message: 'Минимальная длина пароля 5 символов' },
            })}
          />

          {isValid && (
            <Button type="submit" variant="outlined">
              Авторизоваться!
            </Button>
          )}
        </form>
      </Modal>

      <ModalRegister active={activeRegisterModal} setActive={setActiveRegisterModal} />
    </div>
  );
};

export default MainPage;
