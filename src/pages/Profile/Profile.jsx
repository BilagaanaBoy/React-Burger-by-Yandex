import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Input, PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './Profile.module.css';
import clsx from 'clsx';

import { updateUser, logout } from '../../services/actions/authActions';

function Profile() {
    const dispatch = useDispatch();

    const user = useSelector((store) => store.authReducer.user);

    const [form, setValue] = useState({});
    const [changed, setChanged] = useState(false);

    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value });
        setChanged(true);
        console.log(form);
    };

    const cancelClick = (e) => {
        console.log(e, 'canceled');
        setValue(user);
        setChanged(false);
    };

    function onClick(e) {
        console.log(e, form, changed);
        e.preventDefault();
        if (changed) dispatch(updateUser(form));
    }

    function onExit(e) {
        dispatch(logout(form));
    }
    
    useEffect(() => {
        setValue(user);
    }, []);


    return (
        <div className={styles.main}>
            <div className={clsx(styles.nav, 'mr-15')}>
                <NavLink
                    to={{ pathname: '/profile' }}
                    className={clsx(styles.link, 'text text_type_main-medium')}
                    activeClassName={clsx(styles.activeLink, 'text text_type_main-medium')}
                >
                    Профиль
                </NavLink>
                <NavLink
                    to={{ pathname: '/profile/orders' }}
                    className={clsx(styles.link, 'text text_type_main-medium')}
                    activeClassName={clsx(styles.activeLink, 'text text_type_main-medium')}
                >
                    История заказов
                </NavLink>
                <div
                    className={clsx(styles.exitLink, 'text text_type_main-medium')}
                    onClick={onExit}
                >
                    Выход
                </div>
                <p
                    className={clsx(styles.text, 'text text_type_main-default mt-20')}
                >
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            <form className={clsx(styles.form, 'mb-20')} onSubmit={onClick}>
                <div className={'mb-6'}>
                    <Input
                        placeholder="Имя"
                        value={form.name || ''}
                        name="name"
                        onChange={onChange}
                    />
                </div>
                <div className={'mb-6'}>
                    <EmailInput
                        value={form.email || ''}
                        name="email"
                        onChange={onChange}
                    />
                </div>
                <div className={'mb-6'}>
                    <PasswordInput
                        value={form.password || ''}
                        name="password"
                        onChange={onChange}
                    />
                </div>
                <div className={changed ? styles.activeButtons : styles.inactiveButtons}>
                    <Button type="primary" size="medium">
                        Сохранить
                    </Button>
                    <Button onClick={cancelClick} type="secondary">
                        Отмена
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Profile;