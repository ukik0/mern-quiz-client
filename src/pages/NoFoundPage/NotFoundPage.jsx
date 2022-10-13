import React from 'react';

import {useNavigate} from "react-router-dom";

import {motion} from 'framer-motion'

import sadPicture from '../../assets/sad.png'
import cl from './NotFoundPAge.module.scss'

const NotFoundPage = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className={cl.wrapper}>
                <motion.img initial={{opacity: 0, y: -200}} animate={{opacity: 1, y: 0}}
                            transition={{type: 'spring', duration: 1}}
                            src={sadPicture} alt="Page Not Found"/>
                <motion.h1 initial={{y: 200, opacity: 0, scale: 0.5}} animate={{y: 0, opacity: 1, scale: 1}}
                           transition={{type: 'spring', duration: 1.2}} className={cl.title}>
                    Такой страницы не существует
                </motion.h1>
                <motion.button initial={{opacity: 0}} animate={{opacity: 1}}
                               transition={{type: 'spring', duration: 1}} onClick={() => navigate('/quiz')}
                               className={cl.button}>Вернуться назад...
                </motion.button>
            </div>
        </>
    )
};

export default NotFoundPage;
