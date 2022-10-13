import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, fetchRegister } from '../../redux/slices/authSlice';

import { toast } from 'react-toastify';

import cl from './ModalRegister.module.scss';

const ModalRegister = ({ active, setActive }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(checkIsAuth);
  const message = useSelector((state) => state?.auth?.message);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
    mode: 'all',
  });

  const onSubmit = (val) => {
    dispatch(fetchRegister(val));
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
  }, []);

  return (
    <div
      className={`${active ? `${cl.modal} ${cl.active}` : cl.modal}`}
      onClick={() => setActive(false)}>
      <div
        className={`${active ? `${cl.modal__content} ${cl.active}` : cl.modal__content}`}
        onClick={(e) => e.stopPropagation()}>
        <Typography
          variant="h5"
          component={'div'}
          sx={{ textAlign: 'center', marginBottom: '50px', fontWeight: '700' }}>
          Регистрация аккаунта
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            name="fullName"
            fullWidth
            label="Полное имя и фамилия"
            variant="outlined"
            color="secondary"
            placeholder="Полное имя и фамилия"
            focused
            className={cl.TextField}
            inputProps={{ className: cl.TextFieldLabel }}
            sx={{ marginBottom: '20px' }}
            error={!!errors.fullName?.message}
            helperText={errors.fullName?.message}
            {...register('fullName', {
              required: 'Укажите полное имя',
              minLength: { value: 10, message: 'Минимальная длина 10 символов' },
            })}
          />
          <TextField
            name="email"
            fullWidth
            label="Почта"
            variant="outlined"
            color="secondary"
            type={'email'}
            placeholder="Укажите почту"
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
            color="secondary"
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
            <Button disabled={!isValid} type="submit" variant="outlined" color="secondary">
              Зарегистрироваться!
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ModalRegister;
